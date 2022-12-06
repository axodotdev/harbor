import { mount, flushPromises } from "@vue/test-utils";
import SingleReport from "../SingleReport.vue";
import { expect } from "vitest";
import { SINGLE_REPORT_MOCK } from "../../utils/mocks";
import { VueQueryPlugin } from "@tanstack/vue-query";

let wrapper;

const createComponent = ({ props = {}, shallow = false } = {}) => {
  wrapper = mount(SingleReport, {
    props,
    shallow,
    global: {
      plugins: [VueQueryPlugin],
    },
  });
};

describe("SingleReport component", () => {
  beforeEach(async () => {
    createComponent({
      props: {
        report: SINGLE_REPORT_MOCK.suggestions[0],
        criteria: SINGLE_REPORT_MOCK.criteria,
      },
    });
    await flushPromises();

    return () => {
      wrapper.unmount();
      wrapper = null;
    };
  });

  it("mounts and shows package correctly", async () => {
    expect(wrapper.text()).toContain("clap");
    expect(wrapper.text()).toContain("changed from v4.0.15 to v4.0.29");
  });

  it("shows correct criteria", async () => {
    expect(wrapper.text()).toContain(
      SINGLE_REPORT_MOCK.criteria["safe-to-deploy"].description
    );
  });

  it("sourcegraph button has correct link", async () => {
    expect(wrapper.findAll("a")[0].attributes("href")).toBe(
      "https://sourcegraph.com/crates/clap/-/compare/v4.0.15...v4.0.29"
    );
  });
});
