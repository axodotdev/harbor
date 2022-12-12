<script setup>
import { useGithubUser } from "../composables";
const user = await useGithubUser();
</script>
<template>
  <div class="hidden lg:flex lg:flex-shrink-0">
    <div class="flex w-16 flex-col">
      <div
        class="flex min-h-0 flex-1 flex-col border-r border-slate-800 bg-gray-100"
      >
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div
            class="flex flex-shrink-0 items-center px-4 justify-center axo-gradient-text font-bold text-lg"
          >
            H
          </div>
        </div>

        <user-menu :user="user" />
      </div>
    </div>
  </div>
</template>
