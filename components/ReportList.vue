<script setup>
import { onMounted, watch } from "vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupDescription,
} from "@headlessui/vue";
import { useSingleReport } from "../composables";
import ShieldIcon from "./Icons/ShieldIcon.vue";
import { getVersionChangeText } from "../utils/versions";
import { useMutation } from "@tanstack/vue-query";
import { createToast } from "mosha-vue-toastify";

const { areAllEulasApproved } = useSingleReport();
const { query, params } = useRoute();

const { mutateAsync: commit, isLoading } = useMutation({
  mutationFn: () =>
    $fetch(`/api/reports/${params.id}/commit`, {
      method: "POST",
    }),
  onSuccess: () =>
    createToast("Commit triggered!", {
      type: "success",
      hideProgressBar: true,
    }),
  onError: () =>
    createToast("There has been an error", {
      type: "danger",
      hideProgressBar: true,
    }),
});

const { report } = useSingleReport();

const selected = useState(() =>
  query.name
    ? report.value.suggestions.find(
        (suggestion) => suggestion.name === query.name
      )
    : report.value.suggestions[0]
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
    report.value.suggestions.find((suggestion) => suggestion.name === dep.name)
  );

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
    <button
      type="button"
      :disabled="isLoading"
      :class="[
        'inline-flex items-center border border-transparent py-4 text-lg font-medium text-slate-50 disabled:opacity-60 disabled:cursor-default sticky bottom-0 w-full justify-center bg-green-600 hover:bg-green-700',
      ]"
      @click="commit"
    >
      {{ isLoading ? "Committing" : "Commit all changes" }}
    </button>
  </div>
</template>
