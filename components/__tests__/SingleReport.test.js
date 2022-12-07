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

const currentPkg = SINGLE_REPORT_MOCK.suggestions[0];

describe("SingleReport component", () => {
  beforeEach(async () => {
    createComponent({
      props: {
        report: currentPkg,
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
    expect(wrapper.text()).toContain(currentPkg.name);
    expect(wrapper.text()).toContain(
      `changed from v${currentPkg.suggested_diff.from} to v${currentPkg.suggested_diff.to}`
    );
  });

  it("shows correct criteria", async () => {
    expect(wrapper.text()).toContain(
      SINGLE_REPORT_MOCK.criteria["safe-to-deploy"].description
    );
  });

  it("sourcegraph button has correct link", async () => {
    expect(wrapper.find("a").attributes("href")).toBe(
      `https://sourcegraph.com/crates/${currentPkg.name}/-/compare/v${currentPkg.suggested_diff.from}...v${currentPkg.suggested_diff.to}`
    );
  });
});
