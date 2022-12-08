import { render } from "@testing-library/vue";
import User from "../User.vue";

test("mounts component", () => {
  const { container } = render(User, {
    props: {
      user: {
        login: "sara",
        avatar_url: "https://test.com",
      },
    },
  });

  expect(container).toMatchSnapshot();
});
