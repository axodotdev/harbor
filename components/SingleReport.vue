<script setup>
import { usePackageState } from "../composables/usePackagesState";

const props = defineProps({
  report: {
    required: true,
    type: Object,
  },
});
const { togglePackageApproval, state } = usePackageState();
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="py-6 px-4 sm:px-6 lg:px-8">
      <pre>{{ props.report }}</pre>
    </div>

    <footer
      class="axo-gradient flex w-full justify-end text-slate-50 px-4 py-2 text-xs"
    >
      <button
        type="button"
        :class="[
          !state?.[props.report.name]
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            : 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          'inline-flex items-center rounded-md border border-transparent  px-4 py-2 text-base font-medium text-white shadow  focus:outline-none focus:ring-2  focus:ring-offset-2',
        ]"
        @click="() => togglePackageApproval(props.report.name)"
      >
        {{ state?.[props.report.name] ? "Revert approval" : "Approve change" }}
      </button>
    </footer>
  </div>
</template>
