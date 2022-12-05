<script setup>
import { getVersionChangeText } from "../utils/versions";
import { useSourceGraphURL, useCurrentEula } from "../composables";
import { toRef } from "vue";
import AddANote from "./AddANote.vue";
import ReportSwitch from "./ReportSwitch";
import { BusinessButton, AxoLink } from "@axodotdev/fringe/lib";
import { marked } from "marked";

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

const getMarkdownContent = (content) => {
  try {
    return marked.parse(content);
  } catch {
    return content;
  }
};
</script>

<template>
  <div class="flex flex-col justify-between h-full mt-12">
    <div class="py-6 px-4 sm:px-6 lg:px-8">
      <div>
        <div class="flex justify-between items-center gap-6">
          <h1 class="mb-0 break-all">{{ props.report.name }}</h1>
          <AxoLink target="_blank" :href="sourcegraphUrl"
            ><business-button> Review diff in Sourcegraph</business-button>
          </AxoLink>
        </div>
        <small>{{ getVersionChangeText(props.report?.suggested_diff) }}</small>
        <AddANote :name="report.name" />
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
            <div v-html="getMarkdownContent(criteria[currentCriteria])" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
