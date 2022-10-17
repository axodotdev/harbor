<script>
export default {
  name: "AxoButton",
};
</script>

<template>
  <button
    class="bg-axo-orange text-slate-900 w-full rounded-3xl pointer m-1 text-2xl py-1 hover:bg-axo-pink transition"
  >
    <slot></slot>
  </button>
</template>
