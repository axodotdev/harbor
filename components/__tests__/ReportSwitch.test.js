import { VueQueryPlugin } from "@tanstack/vue-query";
import { mount, flushPromises } from "@vue/test-utils";
import ReportSwitch from "../ReportSwitch.vue";
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
    labels: ["one", "two"],
  };

  beforeEach(async () => {
    createComponent({ props: switchProps });
    await flushPromises();

    return () => {
      wrapper.unmount();
      wrapper = null;
    };
  });

  const findSwitch = () => wrapper.find('[role="switch"]');

  it("toggles the label on click", async () => {
    expect(wrapper.text()).toBe("one");
    expect(findSwitch().classes()).not.toContain(switchProps.inversionColor);
    await findSwitch().trigger("click");
    expect(wrapper.text()).toBe("two");
    expect(findSwitch().classes()).toContain(switchProps.inversionColor);
  });

  it("defaults label to true", async () => {
    await wrapper.setProps({ name: "clap" });
    expect(wrapper.text()).toBe("two");
    expect(findSwitch().classes()).toContain(switchProps.inversionColor);
  });
});
