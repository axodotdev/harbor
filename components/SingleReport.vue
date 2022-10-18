<script setup>
import { usePackageState } from "../composables/usePackagesState";
import AxoLink from "@axodotdev/fringe/lib/Link";
import { MISSING_CRITERIA_KEYS } from "../utils/constants";
import { getVersionChangeText } from "../utils/versions";
import { useSourceGraphURL } from "../composables/useSourcegraphUrl";
import { toRef } from "vue";

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
const { togglePackageApproval, state } = usePackageState();
const final = useSourceGraphURL(report);

const get = (criteria) => {
  const defaultCriteria = MISSING_CRITERIA_KEYS[criteria.name];

  if (defaultCriteria) {
    return $fetch(defaultCriteria["description-url"]);
  }

  if (criteria.description) {
    return criteria.description;
  } else {
    return $fetch(criteria["description-url"]);
  }
};
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end">
        <AxoLink
          class="bg-axo-orange p-2 text-slate-900 rounded shadow"
          target="_blank"
          :href="final"
        >
          Open in Sourcegraph
        </AxoLink>
      </div>
      <div>
        <h2 class="!text-axo-pink mb-0">{{ props.report.name }}</h2>
        <small>{{ getVersionChangeText(props.report?.suggested_diff) }}</small>
        <div
          v-for="c in props.report.suggested_criteria"
          :key="c"
          class="flex gap-4 mt-6"
        >
          <input
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-2"
          />
          <div>
            <h4>
              {{ props.criteria[c].name || c }}
            </h4>
            <p class="whitespace-pre-wrap">{{ get(props.criteria[c]) }}</p>
          </div>
        </div>
      </div>
    </div>

    <footer
      class="bg-slate-800 border-t border-t-slate-600 flex w-full justify-between items-end text-slate-50 px-4 pb-6 pt-2 text-xs"
    >
      <div class="w-3/4">
        <label for="comment" class="sr-only">Add your comment</label>
        <div class="flex w-full">
          <textarea
            id="comment"
            placeholder="Add a comment"
            rows="1"
            name="comment"
            class="bg-transparent outline-none border-0 w-full p-4 border-b-axo-orange border-b active:border-b-axo-pink focus:border-b-axo-pink focus:border-b-2 focus:outline-none focus:ring-0 placeholder:text-slate-400"
          />
        </div>
      </div>
      <button
        type="button"
        disabled
        :class="[
          !state?.[props.report.name]
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            : 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          'inline-flex items-center rounded-md border border-transparent  px-4 py-2 text-base font-medium text-white shadow  focus:outline-none focus:ring-2  focus:ring-offset-2 disabled:opacity-60 disabled:cursor-default',
        ]"
        @click="() => togglePackageApproval(props.report.name)"
      >
        {{ state?.[props.report.name] ? "Revert approval" : "Approve change" }}
      </button>
    </footer>
  </div>
</template>
