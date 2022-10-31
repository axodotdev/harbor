import { describe, expect } from "vitest";
import { ref } from "vue";
import { withSetup } from "../../utils/__tests__/test-utils";
import { useSourceGraphURL } from "../useSourcegraphUrl";

describe("useSourceGraphURL", () => {
  test("with fom", () => {
    const report = ref({
      name: "test_crate",
      suggested_diff: { to: "1.1.0", from: "0.9.0" },
    });
    const [url] = withSetup(() => useSourceGraphURL(report));
    expect(url.value).toBe(
      "https://sourcegraph.com/crates/test_crate/-/compare/v0.9.0...v1.1.0"
    );
  });
  test("without fom", () => {
    const report = ref({
      name: "test_crate",
      suggested_diff: { to: "1.1.0" },
    });
    const [url] = withSetup(() => useSourceGraphURL(report));
    expect(url.value).toBe("https://sourcegraph.com/crates/test_crate@v1.1.0");
  });
});
