<script setup>
import { useGithubUser } from "../../composables/github";
const { push } = useRouter();
const route = useRoute();
const user = await useGithubUser();
if (!user.value) {
  push({ path: "/login" });
}

const { data: report } = await useFetch(`/api/reports/${route.params.id}`);
</script>

<template>
  <pre>{{ report }}</pre>
</template>
