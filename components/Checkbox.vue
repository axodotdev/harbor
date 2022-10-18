<script setup>
import { usePackageState } from "../composables/usePackagesState";

const props = defineProps({
  eula: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const { toggleEulaPackageApproval, state } = usePackageState();
const onChange = () => toggleEulaPackageApproval(props.name, props.eula);
</script>
<template>
  <div class="button r relative rounded-3xl">
    <input
      :id="`approve-${name}-${eula}`"
      type="checkbox"
      :checked="state?.[name]?.[eula]"
      class="checkbox relative w-full h-full p-0 m-0 opacity-0 cursor-pointer z-[3]"
      @change="onChange"
    />
    <div
      class="knobs z-[2] before:absolute before:top-1 before:left-1 before:text-slate-100 before:font-bold before:text-center before:text-[9px] before:h-7 before:w-7 before:leading-none before:bg-axo-orange before:rounded-full before:flex before:items-center before:justify-center"
    ></div>
    <div class="layer rounded-3xl w-full border border-axo-pink z-[1]"></div>
  </div>
</template>

<style scoped>
.knobs,
.layer {
  @apply absolute inset-0;
}

.button {
  min-width: 74px;
  height: 36px;
}

.knobs:before {
  content: "NO";
  transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
}

.checkbox:active + .knobs:before {
  width: 46px;
  border-radius: 100px;
}

.checkbox:checked:active + .knobs:before {
  margin-left: -26px;
}

.checkbox:checked + .knobs:before {
  content: "YES";
  background-color: var(--color-success-600);
  left: 42px;
}
</style>
