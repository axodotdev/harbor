<script setup>
import { onMounted } from "vue";
import { useGithubCookie } from "../composables";
import { GH_STATE } from "../utils/constants";
onMounted(() => {
  useGithubCookie().value = null;
  useState(GH_STATE).value = null;
  navigateTo("/");
});
</script>

<template>
  <div />
</template>
