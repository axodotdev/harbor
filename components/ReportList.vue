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
const route = useRoute();
const props = defineProps({
  suggestions: {
    type: Object,
    required: true,
  },
});

const selected = useState(() =>
  route.query.name
    ? props.suggestions.find((a) => a.name === route.query.name)
    : props.suggestions[0]
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
</script>

<template>
  <div class="mt-4">
    <RadioGroup v-model="selected">
      <RadioGroupLabel class="sr-only"> Server size </RadioGroupLabel>
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
                    state?.[dep.name] && 'text-green-300',
                    dep.confident && !state?.[dep.name] && 'text-slate-200',
                    !state?.[dep.name] && !dep.confident && 'text-slate-500',
                    'font-medium flex gap-2 items-center',
                  ]"
                >
                  <shield-icon v-if="state?.[dep.name]" />

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
</template>
