<script setup>
import {
  useSingleReport,
  usePackageInUrl,
  useProtectedPage,
} from "@/composables";
import { MISSING_CRITERIA_KEYS } from "@/utils/constants";
import { computed } from "vue";
import Loading from "../../components/Loading.vue";

definePageMeta({
  layout: false,
});
useProtectedPage();
const { report, isFetched, fetchError } = useSingleReport();
const selected = usePackageInUrl({ report });

const criteria = computed(() => ({
  ...MISSING_CRITERIA_KEYS,
  ...(report.value.criteria || {}),
}));
</script>

<template>
  <div class="h-full w-full">
    <loading v-if="!isFetched" />

    <h2
      v-if="fetchError"
      class="text-center flex items-center h-screen w-screen justify-center"
    >
      You do not have access to this report
    </h2>
    <NuxtLayout v-else name="single">
      <template v-if="report" #list>
        <report-list />
      </template>
      <template v-if="selected" #main>
        <single-report :report="selected" :criteria="criteria" />
      </template>
    </NuxtLayout>
  </div>
</template>
