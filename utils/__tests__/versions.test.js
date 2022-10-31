import { expect } from "vitest";
import { getVersionChangeText } from "../versions";

test("versions no from", () => {
  const diff = getVersionChangeText({
    to: "1.1.0",
  });

  expect(diff).toBe("full audit recommended");
});

test("versions width from", () => {
  const diff = getVersionChangeText({
    to: "1.1.0",
    from: "0.9.0",
  });

  expect(diff).toBe("changed from v0.9.0 to v1.1.0");
});
