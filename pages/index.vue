<script setup>
import { useGithubUser } from "../composables/github";
import { REDIRECT_COOKIE } from "../utils/constants";

const user = await useGithubUser();
useHead({
  title: "Cargo vet",
});

const redirect = useCookie(REDIRECT_COOKIE).value;
if (redirect && user.value) {
  useCookie(REDIRECT_COOKIE).value = null;
  navigateTo({
    path: `/reports/${redirect}`,
  });
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-4xl flex items-center gap-2">Cargo Vet</h1>
    <div class="flex flex-col">
      <User v-if="user" :user="user" />

      <button v-else class="border rounded px-2 py-1" @click="githubLogin">
        Login with GitHub
      </button>
    </div>
  </div>
</template>
