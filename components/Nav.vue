<script setup>
import { useGithubUser } from "../composables/github";

const user = await useGithubUser();
</script>
<template>
  <div class="hidden lg:flex lg:flex-shrink-0">
    <div class="flex w-18 flex-col">
      <div
        class="flex min-h-0 flex-1 flex-col border-r border-slate-800 bg-gray-100"
      >
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
        </div>

        <user-menu :user="user" />
      </div>
    </div>
  </div>
</template>
