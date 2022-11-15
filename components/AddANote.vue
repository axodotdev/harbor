<script setup>
import { computed, ref, watch } from "vue";
import { usePackageState } from "../composables";

const props = defineProps({
  defaultNote: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
});

const noteRef = ref(props.defaultNote);
const { addNote } = usePackageState();

const noteText = computed(() =>
  noteRef.value ? "update note for this library" : "add a note for this library"
);
const notePlaceholder = "add note";
const buttonText = ref("+");

/*
  Right now this just updates state —
  we should make it actually save and give feedback
*/
const saveNote = () => {
  buttonText.value = "...";
  addNote({ pkg: props.name, note: noteRef.value });
  setTimeout(() => (buttonText.value = "+"), 500);
};

/*
  This makes it so that the noteRef resets when
  the component is updated for a new criterion. I'm
  not sure if there is a better way in the composition API
  to deal with this, but given where we are now, I am
  going to leave improving this as a TODO.
*/
watch(
  () => props.name,
  () => {
    noteRef.value = props.defaultNote;
    return;
  }
);
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
            :value="noteRef"
            :placeholder="notePlaceholder"
            rows="1"
            name="comment"
            class="bg-transparent outline-none border-0 w-full p-4 border-b-axo-orange border-b active:border-b-axo-pink focus:border-b-axo-pink focus:border-b-2 focus:outline-none focus:ring-0 placeholder:text-slate-400"
          />
          <button
            class="min-w-max bg-axo-orange text-xl hover:bg-axo-pink px-4 py-2 rounded-md"
            @click="saveNote"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </details>
</template>
