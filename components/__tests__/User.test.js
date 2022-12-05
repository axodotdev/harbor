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

  it("renders the user's name", () => {
    expect(wrapper.find("p").text()).toBe(`Welcome ${user.login}`);
  });

  it("renders a logout button", () => {
    expect(wrapper.findComponent(AxoButton).exists()).toBe(true);
    expect(wrapper.findComponent(AxoButton).text()).toBe("Logout");
  });
});
