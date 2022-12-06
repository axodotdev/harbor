<script>
import { Switch as Toggle, SwitchGroup, SwitchLabel } from "@headlessui/vue";

export default {
  name: "AxoSwitch",
  components: {
    Toggle,
    SwitchGroup,
    SwitchLabel,
  },
  props: {
    as: {
      type: String,
      required: false,
      default: "div",
    },
    inversionColor: {
      type: [String, null],
      required: false,
      default: null,
    },
    labels: {
      type: Array,
      required: false,
      default: () => ["", ""],
    },
    toggled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["update:toggled"],
  data() {
    return {
      enabled: this.toggled,
    };
  },
  computed: {
    displayText() {
      if (Array.isArray(this.labels)) {
        return this.enabled ? this.labels[1] : this.labels[0];
      }

      return this.labels;
    },
    enabledLabelClass() {
      return [
        { [this.inversionColor]: this.isEnabledAndInverted },
        {
          "text-slate-100 pt-2 pb-1 rounded-md": this.isEnabledAndInverted,
        },
        "font-medium px-2",
      ];
    },
    enabledSwitchClass() {
      return this.enabled ? "bg-violet-600" : "bg-slate-200";
    },
    enabledSpanClass() {
      return this.enabled ? "translate-x-5" : "translate-x-0";
    },
    isEnabledAndInverted() {
      return Boolean(this.inversionColor) && this.enabled;
    },
  },
  watch: {
    toggled(newEnabled) {
      this.enabled = newEnabled;
    },
  },
  methods: {
    onToggle(arg) {
      this.enabled = arg;
      this.$emit("update:toggled", arg);
    },
  },
};
</script>

<template>
  <SwitchGroup :as="as" class="flex items-center">
    <Toggle
      :model-value="toggled"
      :class="[
        enabledSwitchClass,
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
      ]"
      @update:modelValue="onToggle"
    >
      <span
        aria-hidden="true"
        :class="[
          enabledSpanClass,
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-50 shadow ring-0 transition duration-200 ease-in-out',
        ]"
      />
    </Toggle>
    <SwitchLabel as="span" class="ml-3">
      <span :class="enabledLabelClass"> {{ displayText }} </span>
    </SwitchLabel>
  </SwitchGroup>
</template>
