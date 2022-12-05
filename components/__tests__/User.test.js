import { mount } from "@vue/test-utils";
import AxoButton from "@axodotdev/fringe/lib/Button.vue";
import User from "../User.vue";

let wrapper;

const createComponent = ({ props = {}, shallow = false } = {}) => {
  wrapper = mount(User, {
    props,
    shallow,
  });
};

afterEach(() => {
  wrapper.unmount();
  wrapper = null;
});

describe("User component", () => {
  const user = {
    login: "sara",
    avatar_url: "https://test.com",
  };

  beforeEach(() => {
    createComponent({ props: { user } });
  });

  // I think we can remove this given that the more detailed
  // checks also checks it mounts and snapshots can be difficult,
  // but I wanted to show what the transformation looks like before
  // just deleting it
  it("renders component", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders the user's name", () => {
    expect(wrapper.find("p").text()).toBe(`Welcome ${user.login}`);
  });

  it("renders a logout button", () => {
    expect(wrapper.findComponent(AxoButton).exists()).toBe(true);
    expect(wrapper.findComponent(AxoButton).text()).toBe("Logout");
  });
});
