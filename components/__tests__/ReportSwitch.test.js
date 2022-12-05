import { mount } from "@vue/test-utils";
import AxoSwitch from "@axodotdev/fringe/lib/Switch.vue";
import ReportSwitch from "../ReportSwitch.vue";
import { mocks } from "./utils";

mocks();

let wrapper;

const createComponent = ({ props = {}, shallow = false } = {}) => {
  console.log("&&", props);

  wrapper = mount(ReportSwitch, {
    props,
    shallow,
  });
};

const defaultSwitchProps = {
  as: "h4",
  inversionColor: "bg-violet-600",
  toggled: false,
};

const createSwitchComponent = ({ props = {}, shallow = false } = {}) => {
  wrapper = mount(AxoSwitch, {
    propsData: {
      ...defaultSwitchProps,
      ...props,
    },
    shallow,
  });
};

// afterEach(() => {
//   wrapper.unmount();
//   wrapper = null;
// });

// Note: This is an example using the underlying switch to
// demonstrate using click to test events. Once we can mount
// the component below, we should replicate it to test the real action
describe("AxoSwitch", () => {
  const props = {
    labels: ["a", "b"],
  };

  const findSwitch = () => wrapper.find('[role="switch"]');

  beforeEach(() => {
    createSwitchComponent({ props });
  });

  it("toggles the label on click", async () => {
    expect(wrapper.text()).toBe("a");
    expect(wrapper.emitted("update:toggled")).toBeUndefined();
    expect(findSwitch().classes()).not.toContain(
      defaultSwitchProps.inversionColor
    );
    await findSwitch().trigger("click");
    expect(wrapper.text()).toBe("b");
    expect(findSwitch().classes()).toContain(defaultSwitchProps.inversionColor);
    expect(wrapper.emitted("update:toggled")[0][0]).toBe(true);
  });
});

// Note: This doesn't work; I think it may be related to the way
// we use composables, but I am not certain.
describe.skip("ReportSwitch component", () => {
  const switchProps = {
    criterion: "safe",
    name: "safe",
    labels: ["safe", "safe"],
  };

  beforeEach(() => {
    createComponent({ props: switchProps });
  });

  it("works", () => {
    expect(true).toBe(true);
  });
});
