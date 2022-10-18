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
const { togglePackageApproval, state, isPackageAllApproved } =
  usePackageState();
const final = useSourceGraphURL(report);
const criteria = useCurrentEula({ report, criteria: props.criteria });
</script>

<template>
  <div class="flex flex-col justify-between h-full relative">
    <div class="py-6 px-4 sm:px-6 lg:px-8 relative">
      <div>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="!text-axo-pink mb-0">{{ props.report.name }}</h2>
            <small class="text-slate-400">
              {{ getVersionChangeText(props.report?.suggested_diff) }}</small
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
          v-for="eula in props.report.suggested_criteria"
          :key="eula"
          class="flex gap-4 mt-6"
        >
          <Checkbox :eula="eula" :name="props.report.name" />

          <div>
            <h4 class="first-letter:capitalize">
              {{ props.criteria[eula].name || c.split("-").join(" ") }}
            </h4>
            <p class="whitespace-pre-wrap">
              {{ criteria[eula] }}
            </p>
          </div>
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
        :disabled="!isPackageAllApproved(report)"
        :class="[
          !state?.[props.report.name]?.approved
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            : 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          'inline-flex items-center rounded-md border border-transparent  px-4 py-2 text-base font-medium text-white shadow  focus:outline-none focus:ring-2  focus:ring-offset-2 disabled:opacity-60 disabled:cursor-default',
        ]"
        @click="() => togglePackageApproval(props.report.name)"
      >
        {{
          state?.[props.report.name]?.approved
            ? "Revert approval"
            : "Approve change"
        }}
      </button>
    </footer>
  </div>
</template>
