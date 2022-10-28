<script setup>
import AxoLink from "@axodotdev/fringe/lib/Link";
import { getVersionChangeText } from "../utils/versions";
import {
  useSourceGraphURL,
  useCurrentEula,
  usePackageState,
} from "../composables";
import { toRef, ref } from "vue";
import Checkbox from "./Checkbox.vue";

const { addNote, state } = usePackageState();
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
const note = ref(state.value[props.report.name]?.note);
const final = useSourceGraphURL(report);
const criteria = useCurrentEula({ report, criteria: props.criteria });
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end">
        <AxoLink
          class="bg-axo-orange p-2 rounded shadow"
          target="_blank"
          :href="final"
          ><span class="text-slate-900"> Open in Sourcegraph</span>
        </AxoLink>
      </div>
      <div>
        <h2 class="!text-axo-pink mb-0">{{ props.report.name }}</h2>
        <small>{{ getVersionChangeText(props.report?.suggested_diff) }}</small>
        <div
          v-for="currentCriteria in props.report.suggested_criteria"
          :key="currentCriteria"
          class="flex gap-4 mt-6"
        >
          <Checkbox :eula="c" :name="props.report.name" />

          <div>
            <h4>
              {{ props.criteria[currentCriteria]?.name || c }}
            </h4>
            <p class="whitespace-pre-wrap">
              {{ criteria[currentCriteria] }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <footer
      class="bg-slate-800 border-t border-t-slate-600 flex w-full justify-between gap-4 text-slate-50 px-4 pb-6 pt-2 text-xs sticky bottom-0"
    >
      <div class="w-full">
        <label for="comment" class="sr-only">add a note</label>
        <div class="flex w-full">
          <textarea
            id="comment"
            v-model="note"
            placeholder="Add a note"
            rows="1"
            name="comment"
            class="bg-transparent outline-none border-0 w-full p-4 border-b-axo-orange border-b active:border-b-axo-pink focus:border-b-axo-pink focus:border-b-2 focus:outline-none focus:ring-0 placeholder:text-slate-400"
            @change="(e) => addNote({ pkg: props.report.name, note })"
          />
        </div>
      </div>
    </footer>
  </div>
</template>
