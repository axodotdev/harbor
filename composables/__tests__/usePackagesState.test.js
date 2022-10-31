import { describe, expect } from "vitest";
import { ref } from "vue";
import { mocks, withSetup } from "../../utils/__tests__/test-utils";
import { usePackageState } from "../usePackagesState.js";

mocks();

describe("usePackageState", () => {
  test("setState", () => {
    const report = ref({
      name: "test_crate",
      suggested_criteria: ["safe-to-deploy"],
    });
    const [{ setState, state }] = withSetup(() => usePackageState());
    setState(report.value);
    expect(state.value).toStrictEqual({
      name: "test_crate",
      suggested_criteria: ["safe-to-deploy"],
    });
  });
  test("addNote", () => {
    const [{ state, addNote }] = withSetup(() => usePackageState());
    addNote({
      pkg: "test_crate",
      note: "yes",
    });
    expect(state.value).toStrictEqual({ test_crate: { note: "yes" } });
  });
  test("toggleEulaPackageApproval", () => {
    const [{ state, toggleEulaPackageApproval }] = withSetup(() =>
      usePackageState()
    );
    toggleEulaPackageApproval({
      pkg: "test_crate",
      eula: "safe-to-deploy",
    });
    expect(state.value).toStrictEqual({
      test_crate: { "safe-to-deploy": true },
    });
  });
  test("all", () => {
    const [{ state, addNote, toggleEulaPackageApproval }] = withSetup(() =>
      usePackageState()
    );
    toggleEulaPackageApproval({
      pkg: "test_crate",
      eula: "safe-to-deploy",
    });
    addNote({
      pkg: "test_crate",
      note: "yes",
    });
    toggleEulaPackageApproval({
      pkg: "test_crate",
      eula: "safe-to-deploy",
    });
    expect(state.value).toStrictEqual({
      test_crate: { "safe-to-deploy": false, note: "yes" },
    });
  });
});
