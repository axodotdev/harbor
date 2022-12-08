import { mount } from "@vue/test-utils";
import { BusinessButton } from "@axodotdev/fringe/lib";
import User from "../User.vue";

let wrapper;

const createComponent = ({ props = {}, shallow = false } = {}) => {
  wrapper = mount(User, {
    props,
    shallow,
  });
};

describe("User component", () => {
  const user = {
    login: "sara",
    avatar_url: "https://test.com",
  };

  beforeEach(() => {
    createComponent({ props: { user } });
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it("renders the user's name", () => {
    expect(wrapper.find("p").text()).toBe(`Welcome ${user.login}`);
  });

  it("renders a logout button", () => {
    expect(wrapper.findComponent(BusinessButton).exists()).toBe(true);
    expect(wrapper.findComponent(BusinessButton).text()).toBe("Logout");
  });
});
