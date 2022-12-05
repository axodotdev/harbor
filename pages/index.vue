<script setup>
import { useGithubUser } from "@/composables";
import { REDIRECT_COOKIE } from "@/utils/constants";
import { GithubIcon, BusinessButton } from "@axodotdev/fringe/lib";

const user = await useGithubUser();
const title = "harbor";
useHead({
  title,
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
  <div
    class="container mx-auto h-full flex flex-col items-center justify-center"
  >
    <h1 class="axo-gradient-text text-center text-8xl leading-tight">
      {{ title }}
    </h1>
    <div class="flex flex-col">
      <User v-if="user" :user="user" />

      <business-button
        v-else
        class="flex gap-2 items-center"
        @click="githubLogin"
      >
        <span>Sign in with GitHub</span>
        <github-icon />
      </business-button>
    </div>
  </div>
</template>
