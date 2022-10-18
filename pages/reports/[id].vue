<script setup>
import SingleLayout from "../../layouts/single.vue";
import { useInfo } from "../../composables/useInfo";
import { usePackageInUrl } from "../../composables/usePackageInUrl";
import { useProtectedPage } from "../../composables/useProtectedPage";
import { MISSING_CRITERIA_KEYS } from "../../utils/constants";
import { computed } from "vue";

const info = useInfo();
const route = useRoute();
useProtectedPage();

const { data: report, error: fetchError } = await useFetch(
  `/api/reports/${route.params.id}`,
  {
    headers: useRequestHeaders(["cookie"]),
  }
);

const selected = usePackageInUrl({ report });
const criteria = computed(() => ({
  ...MISSING_CRITERIA_KEYS,
  ...report.value?.criteria,
}));
</script>

<template>
  <h2
    v-if="fetchError"
    class="text-center flex items-center h-screen w-screen justify-center"
  >
    You do not have access to this report
  </h2>
  <SingleLayout v-else>
    <template v-if="report" #list>
      <report-list :suggestions="report.suggestions" />
    </template>
    <template #main>
      <single-report
        v-if="selected && !info"
        :report="selected"
        :criteria="criteria"
      />
    </template>
  </SingleLayout>
</template>
