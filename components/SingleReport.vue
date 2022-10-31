<script setup>
import AxoLink from "@axodotdev/fringe/lib/Link";
import AxoSwitch from "@axodotdev/fringe/lib/Switch";

import { getVersionChangeText } from "../utils/versions";
import {
  useSourceGraphURL,
  useCurrentEula,
  usePackageState,
} from "../composables";
import { ref, toRef } from "vue";
import AddANote from "./AddANote.vue";

const { state } = usePackageState();
const props = defineProps({
  report: {
    required: true,
    type: Object,
    default: () => {},
  },
  criteria: {
    type: Object,
    required: true,
  },
});

const report = toRef(props, "report");
const toggled = ref(false);

const sourcegraphUrl = useSourceGraphURL(report);
const criteria = useCurrentEula({ report, criteria: props.criteria });

const createLabelsFromCriteria = (currentCriterion) => {
  const criterion = props.criteria[currentCriterion]?.name || currentCriterion;
  return [criterion, criterion];
};

const { toggleEulaPackageApproval } = usePackageState();
const onToggleChange = (eula) => {
  toggleEulaPackageApproval({ pkg: props.report.name, eula });
};
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end">
        <AxoLink
          class="bg-axo-orange p-2 rounded shadow"
          target="_blank"
          :href="sourcegraphUrl"
          ><span class="text-slate-900"> Open in Sourcegraph</span>
        </AxoLink>
      </div>
      <div>
        <h1 class="mb-0">{{ props.report.name }}</h1>
        <small>{{ getVersionChangeText(props.report?.suggested_diff) }}</small>
        <div
          v-for="currentCriteria in props.report.suggested_criteria"
          :key="currentCriteria"
          class="gap-4 mt-12"
        >
          <div>
            <AxoSwitch
              as="h4"
              v-model:toggled="toggled"
              :labels="createLabelsFromCriteria(currentCriteria)"
              :name="props.report.name"
              inversion-color="bg-violet-600"
              @update:toggled="
                (...args) => onToggleChange(currentCriteria, ...args)
              "
            />
            <p class="whitespace-pre-wrap">
              {{ criteria[currentCriteria] }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <AddANote
      :name="report.name"
      :default-note="state[props.report.name]?.note"
    />
  </div>
</template>
