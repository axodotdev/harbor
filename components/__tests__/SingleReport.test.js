import { mount, flushPromises } from "@vue/test-utils";
import SingleReport from "../SingleReport.vue";
import { expect } from "vitest";
import { SINGLE_REPORT_MOCK } from "../../utils/mocks";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { AxoSwitch } from "@axodotdev/fringe/lib";

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
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  const findSwitch = () => wrapper.find('[role="switch"]');
  const findAxoSwitchToggledProp = () =>
    wrapper.findComponent(AxoSwitch).props("toggled");

  it("mounts and shows package correctly", async () => {
    expect(wrapper.find("h1").text()).toBe(currentPkg.name);
    expect(wrapper.find("small").text()).toBe(
      `changed from v${currentPkg.suggested_diff.from} to v${currentPkg.suggested_diff.to}`
    );
  });

  it("shows correct switch state and toggles it", async () => {
    expect(findAxoSwitchToggledProp()).toBe(true);
    await findSwitch().trigger("click");
    expect(findAxoSwitchToggledProp()).toBe(false);
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

  it("changes report and updates all info", async () => {
    const newReport = SINGLE_REPORT_MOCK.suggestions[1];
    await wrapper.setProps({
      report: newReport,
    });
    expect(wrapper.find("h1").text()).toBe(newReport.name);
    expect(wrapper.find("small").text()).toBe(`full audit recommended`);
    expect(wrapper.find("a").attributes("href")).toBe(
      `https://sourcegraph.com/crates/${newReport.name}@v${newReport.suggested_diff.to}`
    );
    expect(findAxoSwitchToggledProp()).toBe(false);
  });
});
