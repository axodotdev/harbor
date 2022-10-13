<script setup>
import { useGithubCookie } from "../composables/github";
import { GH_STATE } from "../utils/constants";

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const logout = () => {
  useGithubCookie().value = null;
  useState(GH_STATE).value = null;
  location.reload();
};
</script>

<template>
  <div class="items-center gap-2 p-5 flex flex-col">
    <div class="flex gap-5">
      <img :src="user.avatar_url" class="rounded-full w-10 h-10 mr-2" />
      <p>
        Welcome <strong>{{ user.login }}</strong>
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
