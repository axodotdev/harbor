<script setup>
import { getVersionChangeText } from "../utils/versions";
import { useSourceGraphURL, useCurrentEula } from "../composables";
import { toRef } from "vue";
import AddANote from "./AddANote.vue";
import ReportSwitch from "./ReportSwitch.vue";
import { BusinessButton, AxoLink } from "@axodotdev/fringe/lib";

const props = defineProps({
  report: {
    required: true,
    type: Object,
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
        <div class="flex justify-between items-center gap-6">
          <h1 class="mb-0 break-all">{{ report.name }}</h1>
          <axo-link target="_blank" :href="sourcegraphUrl"
            ><business-button> Review diff in Sourcegraph</business-button>
          </axo-link>
        </div>
        <small>{{ getVersionChangeText(report.suggested_diff) }}</small>
        <add-a-note :name="report.name" />
        <div
          v-for="currentCriteria in report.suggested_criteria"
          :key="currentCriteria"
          class="gap-4 mt-12"
        >
          <div>
            <report-switch
              :criterion="currentCriteria"
              :name="report.name"
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
