<script setup>
const login = githubLogin;
const user = await useGithubUser();
useHead({
  title: "Cargo vet",
});
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-4xl flex items-center gap-2">Cargo Vet</h1>
    <div class="flex flex-col">
      <User v-if="user" :user="user" />

      <button v-else @click="login" class="border rounded px-2 py-1">
        Login with GitHub
      </button>
    </div>
  </div>
</template>
