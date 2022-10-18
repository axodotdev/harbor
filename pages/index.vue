<script setup>
import { useGithubUser } from "../composables/github";
import { REDIRECT_COOKIE } from "../utils/constants";
import AxoButton from "@axodotdev/fringe/lib/Button.vue";
import GithubIcon from "../components/Icons/GithubIcon.vue";

const user = await useGithubUser();

const redirect = useCookie(REDIRECT_COOKIE).value;
if (redirect && user.value) {
  useCookie(REDIRECT_COOKIE).value = null;
  navigateTo({
    path: `/reports/${redirect}`,
  });
}
</script>

<template>
  <div
    class="container mx-auto h-full flex flex-col items-center justify-center"
  >
    <h1 class="axo-gradient-text text-center text-8xl leading-tight">
      cargo vet
    </h1>
    <div class="flex flex-col">
      <User v-if="user" :user="user" />

      <axo-button
        v-else
        class="flex gap-2 text-base items-center px-2"
        @click="githubLogin"
      >
        <span>Sign in with GitHub</span>
        <github-icon />
      </axo-button>
    </div>
  </div>
</template>
