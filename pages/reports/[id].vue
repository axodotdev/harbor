<script setup>
const route = useRoute();
const { data: report } = await useFetch(`/api/reports/${route.params.id}`);
</script>

<template>
  <pre>{{ report }}</pre>
</template>
