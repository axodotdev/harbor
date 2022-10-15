<script setup>
import SingleLayout from "../../layouts/single.vue";
import { useGithubUser } from "../../composables/github";
import { MISSING_CRITERIA_KEYS, REDIRECT_COOKIE } from "../../utils/constants";
import { onMounted, watch } from "vue";
import { useInfo } from "../../composables/useInfo";

const route = useRoute();
const selected = useState(() => null);
const currentDescription = useState(() => null);
const info = useInfo();
const user = await useGithubUser();
if (!user.value) {
  useCookie(REDIRECT_COOKIE).value = route.params.id;
  navigateTo({
    path: "/",
  });
}

const { data: report, error: fetchError } = await useFetch(
  `/api/reports/${route.params.id}`,
  {
    headers: useRequestHeaders(["cookie"]),
  }
);

const getPkg = () =>
  Object.values(report.value?.suggestions)
    .flat()
    .find((a) => a.name === route.query.name);

onMounted(() => {
  if (report) selected.value = getPkg();
});
watch(route, () => (selected.value = getPkg()));

watch(info, async (currentInfo) => {
  if (currentInfo) {
    const all = currentInfo.split(",");
    all.map(async (single) => {
      const defaultCriteria = MISSING_CRITERIA_KEYS[single];

      if (defaultCriteria) {
        const desc = await $fetch(defaultCriteria["description-url"]);
        currentDescription.value = desc;
        return;
      }
      const currentInReport = report.value.criteria[single];
      console.log(currentInReport);
      if (currentInReport.description) {
        currentDescription.value = currentInReport.description;
      } else {
        const desc = await $fetch(currentInReport["description-url"]);
        currentDescription.value = desc;
      }
    });
  }
});
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
