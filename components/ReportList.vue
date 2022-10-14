<template>
  <div v-for="category in Object.keys(suggestions)" :key="category">
    <h2 class="my-4 px-6 font-bold">{{ KEYS_TO[category] }}</h2>
    <RadioGroup v-model="selected">
      <RadioGroupLabel class="sr-only"> Server size </RadioGroupLabel>
      <div class="space-y-0">
        <RadioGroupOption
          v-for="plan in suggestions[category]"
          :key="plan.name"
          v-slot="{ checked, active }"
          as="template"
          :value="plan"
        >
          <div
            :class="[
              checked ? 'bg-slate-100' : '',
              active ? 'bg-slate-100' : '',
              'relative block cursor-pointer border-b first:border-t bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between',
            ]"
          >
            <span class="flex items-center">
              <span class="flex flex-col text-sm">
                <RadioGroupLabel as="span" class="font-medium text-gray-900">{{
                  plan.name
                }}</RadioGroupLabel>
              </span>
            </span>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { KEYS_TO } from "../utils/constants";
const props = defineProps({
  suggestions: {
    type: Object,
    required: true,
  },
});
const route = useRoute();
const firstPartInList = Object.keys(props.suggestions)[0];
const selected = ref(props.suggestions[firstPartInList][0]);
if (selected.value && !route.query.name) {
  await navigateTo({
    replace: true,
    query: {
      name: selected.value.name,
    },
  });
}

watch(selected, async (newSelected) => {
  await navigateTo({
    replace: true,
    query: {
      name: newSelected.name,
    },
  });
});
</script>
