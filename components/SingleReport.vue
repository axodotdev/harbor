<script setup>
import AxoLink from "@axodotdev/fringe/lib/Link";

import { getVersionChangeText } from "../utils/versions";
import { useSourceGraphURL, useCurrentEula } from "../composables";
import { toRef } from "vue";
import AddANote from "./AddANote.vue";
import ReportSwitch from "./ReportSwitch";

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
const sourcegraphUrl = useSourceGraphURL(report);
const criteria = useCurrentEula({
  report: report.value,
  criteria: props.criteria,
});

const createLabelsFromCriteria = (currentCriterion) => {
  const criterion = props.criteria[currentCriterion]?.name || currentCriterion;
  return [criterion, criterion];
};
</script>

<template>
  <div class="flex flex-col justify-between h-full mt-12">
    <div class="py-6 px-4 sm:px-6 lg:px-8">
      <div>
        <div class="flex justify-between items-center">
          <h1 class="mb-0">{{ props.report.name }}</h1>
          <AxoLink
            class="bg-axo-orange text-sm md:text-base block text-center p-2 rounded shadow"
            target="_blank"
            :href="sourcegraphUrl"
            ><span class="text-slate-900"> Review diff in Sourcegraph</span>
          </AxoLink>
        </div>
        <small>{{ getVersionChangeText(props.report?.suggested_diff) }}</small>
        <AddANote
          :name="report.name"
          :default-note="props.report.name?.note"
          class="mb-24"
        />
        <div
          v-for="currentCriteria in props.report.suggested_criteria"
          :key="currentCriteria"
          class="gap-4 mt-12"
        >
          <div>
            <ReportSwitch
              :criterion="currentCriteria"
              :name="props.report.name"
              :labels="createLabelsFromCriteria(currentCriteria)"
            />
            <p class="whitespace-pre-wrap">
              {{ criteria[currentCriteria] }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
