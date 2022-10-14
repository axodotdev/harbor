<script setup>
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
    <button
      class="border text-black border-gray-600 rounded px-2 hover:border-black"
      @click="logout"
    >
      Logout
    </button>
  </div>
</template>
