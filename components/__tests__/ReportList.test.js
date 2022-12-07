import { mount, flushPromises } from "@vue/test-utils";
import ReportList from "../ReportList.vue";
import { expect } from "vitest";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { nextTick } from "vue";
import { ShieldIcon } from "@axodotdev/fringe/lib";

let wrapper;

const createComponent = ({ props = {}, shallow = false } = {}) => {
  wrapper = mount(ReportList, {
    props,
    shallow,
    global: {
      plugins: [VueQueryPlugin],
    },
  });
};

describe("ReportList component", () => {
  beforeEach(async () => {
    createComponent();
    await flushPromises();

    return () => {
      wrapper.unmount();
      wrapper = null;
    };
  });

  const getOptions = () => wrapper.findAll('[data-test="dependency-option"]');

  it("Shows correct list", async () => {
    expect(wrapper.text()).toContain("clap");
    expect(wrapper.text()).toContain("serde_json");

    expect(wrapper.findAll('[data-test="dependency-option"]')).toHaveLength(2);
  });

  it("clicking on an option calls the navigation", async () => {
    const options = getOptions();
    options[0].trigger("click");
    await nextTick();

    expect(window.navigateTo).toHaveBeenNthCalledWith(3, {
      query: {
        name: "clap",
      },
      replace: true,
    });
  });

  it("Shows shield icon in correct spot", async () => {
    const options = getOptions();

    expect(options[0].findComponent(ShieldIcon).exists()).toBe(true);
    expect(options[1].findComponent(ShieldIcon).exists()).toBe(false);
  });
});
