<script setup>
import SingleLayout from "../../layouts/single.vue";
import { useInfo } from "../../composables/useInfo";
import { usePackageInUrl } from "../../composables/usePackageInUrl";
import { useProtectedPage } from "../../composables/useProtectedPage";
import { useCurrentDescription } from "../../composables/useCurrentDescription";

const info = useInfo();
const route = useRoute();
useProtectedPage();

const { data: report, error: fetchError } = await useFetch(
  `/api/reports/${route.params.id}`,
  {
    headers: useRequestHeaders(["cookie"]),
  }
);
const currentDescription = useCurrentDescription({ report, info });
const selected = usePackageInUrl({ report });
</script>

<template>
  <h2
    v-if="fetchError"
    class="text-center flex items-center h-screen w-screen justify-center"
  >
    You do not have access to this report
  </h2>
  <SingleLayout v-if="!fetchError">
    <template v-if="report" #list>
      <report-list :suggestions="report.suggestions" />
    </template>
    <template #main>
      <div v-if="info" class="relative">
        <button @click="info = null">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 absolute right-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3>Description</h3>
        <p class="whitespace-pre-wrap">{{ currentDescription }}</p>
      </div>
      <single-report v-if="selected && !info" :report="selected" />
    </template>
  </SingleLayout>
</template>
