<script setup>
import { onMounted, watch } from "vue";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { MISSING_CRITERIA_KEYS } from "../utils/constants";
import { useInfo } from "../composables/useInfo";
import { usePackageState } from "../composables/usePackagesState";
import InfoIcon from "./Icons/InfoIcon.vue";
import ShieldIcon from "./Icons/ShieldIcon.vue";

const { state } = usePackageState();
const info = useInfo();
const props = defineProps({
  suggestions: {
    type: Object,
    required: true,
  },
});
const firstPartInList = Object.keys(props.suggestions)[0];
const selected = useState(() => props.suggestions[firstPartInList][0]);

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
  <div v-for="category in Object.keys(suggestions)" :key="category">
    <h5
      class="my-4 px-6 first-letter:capitalize flex gap-2 items-center justify-between"
    >
      {{
        MISSING_CRITERIA_KEYS[category]?.name || category.split("-").join(" ")
      }}
      <button @click="info = category">
        <info-icon />
      </button>
    </h5>
    <RadioGroup v-model="selected">
      <RadioGroupLabel class="sr-only"> Server size </RadioGroupLabel>
      <div class="space-y-0 border-t-slate-800 border-t">
        <RadioGroupOption
          v-for="dep in suggestions[category]"
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

              'relative border-t border-t-transparent block cursor-pointer border-b  border-b-slate-800 px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between',
            ]"
          >
            <span class="flex items-center">
              <span class="flex flex-col text-sm min-h-[24px] justify-center">
                <RadioGroupLabel
                  as="span"
                  :class="[
                    state?.[dep.name] ? 'text-green-300' : ' text-slate-200',
                    ' font-medium flex gap-2 items-center',
                  ]"
                >
                  <shield-icon v-if="state?.[dep.name]" />

                  {{ dep.name }}</RadioGroupLabel
                >
              </span>
            </span>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>
