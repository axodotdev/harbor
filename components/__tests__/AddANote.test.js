import { render } from "@testing-library/vue";
import { mocks } from "../../utils/__tests__/test-utils";
import AddANote from "../AddANote.vue";

mocks();

test("mounts component", () => {
  const { container } = render(AddANote, {
    props: {
      defaultNote: "",
      name: "test-pkg",
    },
  });

  expect(container).toMatchSnapshot();
});

test("mounts component with default note", () => {
  const { container } = render(AddANote, {
    props: {
      defaultNote: "test",
      name: "test-pkg",
    },
  });

  expect(container).toMatchSnapshot();
});
