<script setup>
import SingleLayout from "../../layouts/single.vue";
import {
  useProtectedPage,
  useSingleReport,
  usePackageState,
  usePackageInUrl,
} from "../../composables";
import { MISSING_CRITERIA_KEYS } from "../../utils/constants";

import { computed } from "vue";
const { report, isLoading, fetchError } = useSingleReport();
useProtectedPage();
const selected = usePackageInUrl({ report });
usePackageState({ initialState: report?.state });

const criteria = computed(() => ({
  ...MISSING_CRITERIA_KEYS,
  ...report?.value?.criteria,
}));
</script>

<template>
  <h2
    v-if="fetchError"
    class="text-center flex items-center h-screen w-screen justify-center"
  >
    You do not have access to this report
  </h2>
  <SingleLayout v-if="!fetchError && !isLoading">
    <template v-if="report" #list>
      <report-list :suggestions="report.suggestions" />
    </template>
    <template v-if="selected" #main>
      <single-report :report="selected" :criteria="criteria" />
    </template>
  </SingleLayout>
</template>
