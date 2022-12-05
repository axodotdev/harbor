<script setup>
import { computed } from "vue";
import AxoSwitch from "@axodotdev/fringe/lib/Switch.vue";
import { useSingleReport } from "../composables";

const props = defineProps({
  criterion: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  },
});
const { report, toggleEulaPackageApproval } = useSingleReport();
const currentPackage = computed(() => report.value.state?.[props.name] || {});

const onToggleChange = () => {
  toggleEulaPackageApproval({ pkg: props.name, eula: props.criterion });
};
</script>

<template>
  <AxoSwitch
    :key="name"
    v-model:toggled="currentPackage[criterion]"
    as="h4"
    :labels="labels"
    :name="name"
    inversion-color="bg-violet-600"
    @update:toggled="onToggleChange"
  />
</template>
