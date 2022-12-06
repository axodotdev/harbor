<script setup>
import { watchEffect } from "vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupDescription,
} from "@headlessui/vue";
import { useSingleReport, useCommit } from "../composables";
import { BusinessButton, ShieldIcon } from "@axodotdev/fringe/lib";
import { getVersionChangeText } from "../utils/versions";

const { report } = useSingleReport();
const { query } = useRoute();
const { commit, isLoading } = useCommit();

const selected = useState(() =>
  query.name
    ? report.value.suggestions.find(
        (suggestion) => suggestion.name === query.name
      )
    : report.value.suggestions[0]
);

watchEffect(async () => {
  await navigateTo({
    replace: true,
    query: {
      name: selected.value.name,
    },
  });
});

const isAllApproved = (dep) => {
  const currentReport = report.value.suggestions.find(
    (suggestion) => suggestion.name === dep.name
  );

  return currentReport.suggested_criteria.every(
    (criteria) => report.value?.state?.[currentReport.name]?.[criteria]
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
</script>

<template>
  <div class="relative h-full">
    <div class="mt-4 h-full overflow-y-auto">
      <RadioGroup v-model="selected">
        <RadioGroupLabel class="sr-only"> Dependencies </RadioGroupLabel>
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
      class="inline-flex items-center rounded-none text-slate-50 sticky bottom-0 w-full justify-center bg-green-600 hover:bg-green-700"
      @click="commit"
    >
      {{ isLoading ? "Committing" : "Commit all changes" }}
    </business-button>
  </div>
</template>
