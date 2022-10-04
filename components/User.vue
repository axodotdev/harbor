<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
const logout = githubLogout;
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
      @click="logout"
      class="border text-black border-gray-600 rounded px-2 hover:border-black"
    >
      Logout
    </button>
    <pre class="whitespace-pre">
        {{ JSON.stringify(user, null, 2) }}
    </pre>
  </div>
</template>
