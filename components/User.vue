<script setup>
import { BusinessButton } from "@axodotdev/fringe/lib";

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const logout = () => navigateTo("/logout");
</script>

<template>
  <div class="items-center gap-2 p-5 flex flex-col">
    <div class="flex gap-4 items-center mb-4">
      <img :src="user.avatar_url" class="rounded-full w-10 h-10" />
      <p class="m-0">
        Welcome <span class="font-bold">{{ user.login }}</span>
      </p>
    </div>
    <business-button @click="logout"> Logout </business-button>
  </div>
</template>
