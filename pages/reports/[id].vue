<script setup>
import { useGithubUser } from "../../composables/github";

const { push } = useRouter();
const route = useRoute();
const user = await useGithubUser();
if (!user.value) {
  push({ path: "/login" });
}

const { data: report, error: fetchError } = await useFetch(
  `/api/reports/${route.params.id}`,
  {
    headers: useRequestHeaders(["cookie"]),
  }
);
</script>

<template>
  <p v-if="fetchError">You do not have access to this report</p>
  <pre v-if="!error">{{ report }}</pre>
</template>
