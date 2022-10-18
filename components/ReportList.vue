<script setup>
import { onMounted, watch } from "vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupDescription,
} from "@headlessui/vue";
import { usePackageState } from "../composables/usePackagesState";
import ShieldIcon from "./Icons/ShieldIcon.vue";
import { getVersionChangeText } from "../utils/versions";

const { state } = usePackageState();
const {
  query: { name },
} = useRoute();
const props = defineProps({
  suggestions: {
    type: Object,
    required: true,
  },
});

const selected = useState(() =>
  name
    ? props.suggestions.find((suggestion) => suggestion.name === name)
    : props.suggestions[0]
);

onMounted(() => {
  navigateTo({
    replace: true,
    query: {
      name: selected.value.name,
    },
  });
});

watch(selected, (newSelected) => {
  navigateTo({
    replace: true,
    query: {
      name: newSelected.name,
    },
  });
});

const getClasses = (dep) => {
  const isApproved = state.value?.[dep.name]?.approved;
  if (isApproved) return "text-success-300";

  if (dep.confident) {
    return "text-slate-200";
  } else {
    return "text-slate-500";
  }
};
</script>

<template>
  <div class="mt-4">
    <RadioGroup v-model="selected">
      <RadioGroupLabel class="sr-only"> Dependencies </RadioGroupLabel>
      <div class="space-y-0 border-t-slate-800 border-t">
        <RadioGroupOption
          v-for="dep in suggestions"
          :key="dep.name"
          v-slot="{ checked, active }"
          as="template"
          :value="dep"
        >
          <div
            :class="[
              (checked || active) &&
                'bg-slate-800 border-t !border-t-slate-600 !border-b-slate-600 ',
              'relative border-t border-t-transparent block cursor-pointer border-b border-b-slate-800 px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between hover:bg-slate-800 hover:border-t ',
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
                  <shield-icon v-if="state?.[dep.name]?.approved" />

                  {{ dep.name }}
                </RadioGroupLabel>
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
</template>
