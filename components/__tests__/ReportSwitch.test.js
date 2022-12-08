import { VueQueryPlugin } from "@tanstack/vue-query";
import { mount, flushPromises } from "@vue/test-utils";
import ReportSwitch from "../ReportSwitch.vue";
import { AxoSwitch } from "@axodotdev/fringe/lib";
import { expect } from "vitest";

let wrapper;

const createComponent = ({ props = {}, shallow = false } = {}) => {
  wrapper = mount(ReportSwitch, {
    props,
    shallow,
    global: {
      plugins: [VueQueryPlugin],
    },
  });
};

describe("ReportSwitch component", () => {
  const switchProps = {
    as: "h4",
    inversionColor: "bg-violet-600",
    criterion: "safe-to-deploy",
    name: "serde_json",
    labels: ["safe-to-deploy", "safe-to-deploy"],
  };

  beforeEach(async () => {
    createComponent({ props: switchProps });
    await flushPromises();
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  const findSwitch = () => wrapper.find('[role="switch"]');
  const findAxoSwitchToggledProp = () =>
    wrapper.findComponent(AxoSwitch).props("toggled");

  it("toggles the label on click", async () => {
    expect(findAxoSwitchToggledProp()).toBe(false);
    await findSwitch().trigger("click");
    expect(findAxoSwitchToggledProp()).toBe(true);
  });

  it("defaults label to true", async () => {
    await wrapper.setProps({ name: "clap" });

    expect(findAxoSwitchToggledProp()).toBe(true);
  });
});
