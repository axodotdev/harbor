<script>
import { usePackageState } from "../composables";

export default {
  name: "Add a Note",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { state, addNote } = usePackageState();

    return {
      addNote,
      state,
    };
  },
  data() {
    return {
      tempFormValue: "",
      buttonText: "+",
    };
  },
  notePlaceholder: "add note",
  computed: {
    noteRef() {
      return this.state[this.name]?.note;
    },
    eitherOr() {
      return this.tempFormValue || this.noteRef;
    },
    noteText() {
      return this.noteRef
        ? "update note for this library"
        : "add a note for this library";
    },
  },
  methods: {
    updateText(evt) {
      this.tempFormValue = evt.target.value;
    },
    resetButton() {
      this.buttonText = "+";
    },
    saveNote() {
      /*
        Right now this just updates state —
        we should make it actually save and give feedback
      */
      this.buttonText = "...";
      this.addNote({ pkg: this.name, note: this.tempFormValue });
      setTimeout(this.resetButton, 500);
      this.tempFormValue = "";
    },
  },
};
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
            :value="eitherOr"
            :placeholder="$options.notePlaceholder"
            rows="1"
            name="comment"
            class="bg-transparent outline-none border-0 w-full p-4 border-b-axo-orange border-b active:border-b-axo-pink focus:border-b-axo-pink focus:border-b-2 focus:outline-none focus:ring-0 placeholder:text-slate-400"
            @input="updateText"
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
