<script setup>
import { computed, ref, watchEffect } from "vue";
import { AxoSwitch } from "@axodotdev/fringe/lib";
import { useSingleReport } from "../composables";
import { useToggleApproval } from "../composables/useToggleApprovall";

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
const { toggleEulaPackageApproval } = useToggleApproval();
const { report } = useSingleReport();
const currentPackage = computed(() => report.value.state?.[props.name] || {});
const checked = ref(currentPackage.value[props.criterion]);

watchEffect(() => {
  checked.value = currentPackage.value[props.criterion];
});

const onToggleChange = () => {
  toggleEulaPackageApproval({ pkg: props.name, eula: props.criterion });
};
</script>

<template>
  <AxoSwitch
    :key="name"
    v-model:toggled="checked"
    as="h4"
    :labels="labels"
    :name="name"
    inversion-color="bg-violet-600"
    @update:toggled="onToggleChange"
  />
</template>
