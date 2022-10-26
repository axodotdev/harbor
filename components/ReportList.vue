<script setup>
import { onMounted, watch } from "vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupDescription,
} from "@headlessui/vue";
import { usePackageState } from "../composables";
import ShieldIcon from "./Icons/ShieldIcon.vue";
import { getVersionChangeText } from "../utils/versions";
const { areAllEulasApproved } = usePackageState();
const isLoading = useState(() => false);
const route = useRoute();
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const selected = useState(() =>
  route.query.name
    ? props.report.suggestions.find((a) => a.name === route.query.name)
    : props.report.suggestions[0]
);

onMounted(async () => {
  await navigateTo({
    replace: true,
    query: {
      name: selected.value.name,
    },
  });
});

watch(selected, async (newSelected) => {
  await navigateTo({
    replace: true,
    query: {
      name: newSelected.name,
    },
  });
});

const isAllApproved = (dep) =>
  areAllEulasApproved(
    props.report.suggestions.find((s) => s.name === dep.name)
  );

const getClasses = (dep) => {
  if (isAllApproved(dep)) return "text-green-300";

  if (dep.confident) {
    return "text-slate-200";
  } else {
    return "text-slate-500";
  }
};

const onCommit = async () => {
  isLoading.value = true;
  await $fetch(`/api/reports/${route.params.id}/commit`, {
    method: "POST",
  });
  isLoading.value = false;
};
</script>

<template>
  <div class="mt-4">
    <RadioGroup v-model="selected">
      <RadioGroupLabel class="sr-only"> Server size </RadioGroupLabel>
      <div class="space-y-0 border-t-slate-800 border-t">
        <RadioGroupOption
          v-for="dep in report.suggestions"
          :key="dep.name"
          v-slot="{ checked, active }"
          as="template"
          :value="dep"
        >
          <div
            :class="[
              checked || active
                ? 'bg-slate-800 border-t !border-t-slate-600 !border-b-slate-600 '
                : '',

              'relative border-t border-t-transparent block cursor-pointer border-b  border-b-slate-800 px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between hover:bg-slate-800 hover:border-t ',
            ]"
          >
            <span class="flex items-center">
              <span class="flex flex-col text-sm min-h-[24px] justify-center">
                <RadioGroupLabel
                  as="span"
                  :class="[
                    getClasses(dep),
                    'font-medium flex gap-2 items-center',
                  ]"
                >
                  <shield-icon v-if="isAllApproved(dep)" />

                  {{ dep.name }}</RadioGroupLabel
                >
                <RadioGroupDescription
                  :class="[
                    'm-0 text-xs ',
                    dep.confident ? ' !text-slate-500' : '!text-slate-600',
                  ]"
                >
                  {{ getVersionChangeText(dep?.suggested_diff) }}
                </RadioGroupDescription>
              </span>
            </span>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
  <button
    type="button"
    :disabled="isLoading"
    :class="[
      'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      'inline-flex items-center border border-transparent  px-4 py-2 text-lg font-medium text-white shadow  focus:outline-none focus:ring-2  focus:ring-offset-2 disabled:opacity-60 disabled:cursor-default absolute bottom-0 w-full justify-center',
    ]"
    @click="onCommit"
  >
    Commit changes
  </button>
</template>
