import { mount, flushPromises } from "@vue/test-utils";
import ReportList from "../ReportList.vue";
import { afterEach, expect } from "vitest";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { nextTick } from "vue";
import { ShieldIcon } from "@axodotdev/fringe/lib";
import { SINGLE_REPORT_MOCK } from "../../utils/mocks";

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
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  const getOptions = () => wrapper.findAll('[data-test="dependency-option"]');

  it("Shows correct list", async () => {
    SINGLE_REPORT_MOCK.suggestions.map(({ name }) => {
      expect(wrapper.find('[data-test="dependency-options"]').text()).toContain(
        name
      );
    });

    expect(getOptions()).toHaveLength(2);
  });

  it("clicking on an option calls the navigation", async () => {
    const options = getOptions();
    options[0].trigger("click");
    await nextTick();

    expect(window.navigateTo).toHaveBeenNthCalledWith(2, {
      query: {
        name: SINGLE_REPORT_MOCK.suggestions[0].name,
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
