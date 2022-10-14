<script setup>
const props = defineProps({
  report: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <pre>{{ props.report }}</pre>
</template>
