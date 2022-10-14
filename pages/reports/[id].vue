<script setup>
import SingleLayout from "../../layouts/single.vue";
import { useGithubUser } from "../../composables/github";
import { REDIRECT_COOKIE } from "../../utils/constants";
import ReportList from "../../components/ReportList.vue";
import { onMounted, ref, watch } from "vue";

const route = useRoute();
const selected = ref();
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
</script>

<template>
  <SingleLayout>
    <template #list v-if="report">
      <ReportList :suggestions="report.suggestions" />
    </template>
    <template #main>
      <p v-if="fetchError">You do not have access to this report</p>
      <pre v-else>{{ selected }}</pre>
    </template>
  </SingleLayout>
</template>
