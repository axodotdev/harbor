<script setup>
import { computed, ref, watchEffect } from "vue";
import { useSingleReport } from "../composables";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const tempFormValue = ref("");
const { addNote, report, isLoadingNote } = useSingleReport();

watchEffect(() => {
  tempFormValue.value = report.value?.state?.[props.name]?.note;
});

const noteText = computed(() =>
  tempFormValue.value
    ? "update note for this library"
    : "add a note for this library"
);

const notePlaceholder = "add note";
</script>

<template>
  <details class="mt-8 cursor-pointer text-axo-orange text-xl">
    <summary class="">{{ noteText }}</summary>
    <div
      class="mt-8 w-4/5 bg-slate-800 border-t border-t-slate-600 flex justify-between gap-4 text-slate-50 px-4 pb-6 pt-2 text-xs"
    >
      <div class="w-full">
        <label for="comment" class="sr-only">{{ noteText }}</label>
        <div class="flex gap-4 items-end">
          <textarea
            id="comment"
            v-model="tempFormValue"
            :placeholder="notePlaceholder"
            rows="1"
            name="comment"
            class="bg-transparent outline-none border-0 w-full p-4 border-b-axo-orange border-b active:border-b-axo-pink focus:border-b-axo-pink focus:border-b-2 focus:outline-none focus:ring-0 placeholder:text-slate-400"
          />
          <button
            class="min-w-max bg-axo-orange text-xl hover:bg-axo-pink px-4 py-2 rounded-md"
            @click="addNote({ pkg: props.name, note: tempFormValue.value })"
          >
            {{ isLoadingNote ? "..." : "+" }}
          </button>
        </div>
      </div>
    </div>
  </details>
</template>
