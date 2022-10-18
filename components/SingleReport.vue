<script setup>
import { usePackageState } from "../composables/usePackagesState";
import AxoLink from "@axodotdev/fringe/lib/Link";
import { getVersionChangeText } from "../utils/versions";
import { useSourceGraphURL } from "../composables/useSourcegraphUrl";
import { useCurrentEula } from "../composables/useCurrentEula";
import { toRef } from "vue";
import Checkbox from "./Checkbox.vue";

const props = defineProps({
  report: {
    required: true,
    type: Object,
    default: () => {},
  },
  criteria: {
    type: Object,
    required: true,
  },
});
const report = toRef(props, "report");
const { togglePackageApproval, state } = usePackageState();
const final = useSourceGraphURL(report);
const currentEula = useCurrentEula({ report, criteria: props.criteria });
</script>

<template>
  <div class="flex flex-col justify-between h-full relative">
    <div class="py-6 px-4 sm:px-6 lg:px-8 relative">
      <div>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="!text-axo-pink mb-0">{{ report.name }}</h2>
            <small class="text-slate-400">
              {{ getVersionChangeText(report?.suggested_diff) }}</small
            >
          </div>
          <AxoLink
            class="bg-axo-orange p-2 text-slate-900 rounded shadow"
            target="_blank"
            :href="final"
          >
            Open in Sourcegraph
          </AxoLink>
        </div>
        <div
          v-for="eula in report.suggested_criteria"
          :key="eula"
          class="gap-4 mt-6"
        >
          <div class="flex gap-4 items-center mb-4">
            <Checkbox :eula="eula" :name="report.name" />

            <h4 class="first-letter:capitalize mb-0">
              {{ criteria[eula].name || eula.split("-").join(" ") }}
            </h4>
          </div>
          <p class="whitespace-pre-wrap">
            {{ currentEula[eula] }}
          </p>
        </div>
      </div>
    </div>

    <footer
      class="bg-slate-800 border-t border-t-slate-600 flex w-full justify-between items-end text-slate-50 px-4 pb-6 pt-2 text-xs sticky bottom-0 right-0 z-50"
    >
      <div class="w-3/4">
        <label for="comment" class="sr-only">Add your comment</label>
        <div class="flex w-full">
          <textarea
            id="comment"
            placeholder="Add a comment"
            rows="1"
            name="comment"
            class="bg-transparent outline-none border-0 w-full p-4 border-b-axo-orange border-b active:border-b-axo-pink focus:border-b-axo-pink focus:border-b-2 focus:outline-none focus:ring-0 placeholder:text-slate-400"
          />
        </div>
      </div>
      <button
        type="button"
        :disabled="!state?.[report.name]"
        :class="[
          !state?.[report.name]?.approved
            ? 'bg-success-600 hover:bg-success-700 focus:ring-success-700'
            : 'bg-error-600 hover:bg-error-700 focus:ring-error-700',
          'inline-flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-default',
        ]"
        @click="() => togglePackageApproval(report.name)"
      >
        {{
          state?.[report.name]?.approved ? "Revert approval" : "Approve change"
        }}
      </button>
    </footer>
  </div>
</template>
