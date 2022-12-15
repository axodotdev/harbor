<script setup>
import { watchEffect, computed, ref } from "vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupDescription,
} from "@headlessui/vue";
import { useSingleReport, useCommit } from "../composables";
import { BusinessButton, ShieldIcon } from "@axodotdev/fringe/lib";
import { getVersionChangeText } from "../utils/versions";
import { AxoModal } from "@axodotdev/fringe/lib";

const { report } = useSingleReport();
const { query } = useRoute();
const { commit, isLoading } = useCommit();
const modalOpen = ref(false);
const suggestions = computed(() => report.value.suggestions || []);
const urlPkg = query.name
  ? suggestions.value.find((suggestion) => suggestion.name === query.name)
  : suggestions.value[0];
const selected = ref(urlPkg);

watchEffect(async () => {
  if (selected.value) {
    await navigateTo({
      replace: true,
      query: {
        name: selected.value?.name,
      },
    });
  }
});

const isAllApproved = (dep) => {
  const currentReport = report.value.suggestions.find(
    (suggestion) => suggestion.name === dep.name
  );

  return currentReport.suggested_criteria.every((criteria) =>
    Boolean(report.value.state?.[currentReport.name]?.[criteria])
  );
};

const getClasses = (dep) => {
  if (isAllApproved(dep)) return "text-green-300";

  if (dep.confident) {
    return "text-slate-200";
  } else {
    return "text-slate-500";
  }
};

const onSubmit = () => {
  commit();
  modalOpen.value = false;
};
</script>

<template>
  <div v-if="suggestions.length" class="relative h-full">
    <AxoModal
      :open="modalOpen"
      title="Commit changes"
      submit-button-text="Commit"
      @on-close="() => (modalOpen = false)"
      @on-submit="onSubmit"
      >This will make a commit on github with the changes you made here. Are you
      sure you want to commit the changes?</AxoModal
    >
    <div class="mt-4 h-full overflow-y-auto">
      <RadioGroup v-model="selected">
        <RadioGroupLabel class="sr-only"> Dependencies </RadioGroupLabel>
        <div
          class="space-y-0 border-t-slate-800 border-t"
          data-test="dependency-options"
        >
          <RadioGroupOption
            v-for="dep in suggestions"
            :key="dep.name"
            v-slot="{ checked, active }"
            as="template"
            :value="dep"
          >
            <div
              data-test="dependency-option"
              :class="[
                checked || active
                  ? 'bg-slate-800 border-t !border-t-slate-600 !border-b-slate-600 '
                  : '',

                'border-t border-t-transparent block cursor-pointer border-b border-b-slate-800 px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between hover:bg-slate-800 hover:border-t ',
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
    <business-button
      :disabled="isLoading"
      class="inline-flex items-center rounded-none text-slate-50 fixed md:sticky bottom-0 w-full justify-center bg-green-600 hover:bg-green-700 z-10"
      @click="modalOpen = true"
    >
      {{ isLoading ? "Committing" : "Commit all changes" }}
    </business-button>
  </div>
</template>
