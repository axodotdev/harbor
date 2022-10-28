<script setup>
import AxoLink from "@axodotdev/fringe/lib/Link";
import { getVersionChangeText } from "../utils/versions";
import {
  useSourceGraphURL,
  useCurrentEula,
  usePackageState,
} from "../composables";
import { toRef } from "vue";
import Checkbox from "./Checkbox.vue";
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

const sourcegraphUrl = useSourceGraphURL(report);
const criteria = useCurrentEula({ report, criteria: props.criteria });
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
        <h2 class="!text-axo-pink mb-0">{{ props.report.name }}</h2>
        <small>{{ getVersionChangeText(props.report?.suggested_diff) }}</small>
        <div
          v-for="currentCriteria in props.report.suggested_criteria"
          :key="currentCriteria"
          class="flex gap-4 mt-6"
        >
          <Checkbox :eula="currentCriteria" :name="props.report.name" />

          <div>
            <h4>
              {{ props.criteria[currentCriteria]?.name || currentCriteria }}
            </h4>
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
