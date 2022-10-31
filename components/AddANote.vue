<script setup>
import { toRef } from "vue";
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
const note = toRef(props, "defaultNote");
const { addNote } = usePackageState();
</script>

<template>
  <footer
    class="bg-slate-800 border-t border-t-slate-600 flex w-full justify-between gap-4 text-slate-50 px-4 pb-6 pt-2 text-xs sticky bottom-0"
  >
    <div class="w-full">
      <label for="comment" class="sr-only">add a note</label>
      <div class="flex w-full">
        <textarea
          id="comment"
          v-model="note"
          placeholder="Add a note"
          rows="1"
          name="comment"
          class="bg-transparent outline-none border-0 w-full p-4 border-b-axo-orange border-b active:border-b-axo-pink focus:border-b-axo-pink focus:border-b-2 focus:outline-none focus:ring-0 placeholder:text-slate-400"
          @change="() => addNote({ pkg: props.name, note })"
        />
      </div>
    </div>
  </footer>
</template>
