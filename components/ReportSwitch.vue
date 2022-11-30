<script setup>
import { ref, watchEffect } from "vue";
import AxoSwitch from "@axodotdev/fringe/lib/Switch";
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

const toggled = ref(report.value.state?.[props.name]?.[props.criterion]);

watchEffect(() => {
  toggled.value = report.value.state?.[props.name]?.[props.criterion];
});

const onToggleChange = () => {
  toggleEulaPackageApproval({ pkg: props.name, eula: props.criterion });
};
</script>

<template>
  <AxoSwitch
    :key="props.name"
    :toggled="toggled"
    as="h4"
    :labels="props.labels"
    :name="props.name"
    inversion-color="bg-violet-600"
    @update:toggled="onToggleChange"
  />
</template>
