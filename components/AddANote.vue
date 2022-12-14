<script setup>
import { computed, ref } from "vue";
import { useSingleReport } from "../composables";
import { useNote } from "../composables/useNote";
import { NOTE_MESSAGES } from "../utils/constants";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const tempFormValue = ref({});
const { mutateNote, isLoadingNote } = useNote();
const { report } = useSingleReport();
const currentPackage = computed(() => report.value.state?.[props.name] || {});

const updateFormText = (evt) => {
  tempFormValue.value[props.name] = evt.target.value;
};

const noteInnerText = computed(() => {
  return tempFormValue.value[props.name] || currentPackage.value.note;
});

const noteText = computed(() =>
  currentPackage.value.note ? NOTE_MESSAGES.filled : NOTE_MESSAGES.empty
);

const buttonText = computed(() => (isLoadingNote.value ? "..." : "+"));
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
            :value="noteInnerText"
            :placeholder="NOTE_MESSAGES.placeholder"
            rows="1"
            name="comment"
            class="bg-transparent outline-none border-0 w-full p-4 border-b-axo-orange border-b active:border-b-axo-pink focus:border-b-axo-pink focus:border-b-2 focus:outline-none focus:ring-0 placeholder:text-slate-400"
            @input="updateFormText"
          />
          <button
            class="min-w-max bg-axo-orange text-xl hover:bg-axo-pink px-4 py-2 rounded-md"
            @click="mutateNote({ pkg: name, note: tempFormValue[name] })"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </details>
</template>
