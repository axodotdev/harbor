// test-utils.js
import { createApp, ref } from "vue";
import { vi } from "vitest";

export function withSetup(composable) {
  let result;
  const app = createApp({
    setup() {
      result = composable();
      // suppress missing template warning
      return () => {};
    },
  });
  app.mount(document.createElement("div"));
  // return the result and the app instance
  // for testing provide / unmount
  return [result, app];
}

export const mocks = () => {
  const $fetch = vi.fn(() => {});

  vi.stubGlobal("$fetch", $fetch);

  const useRoute = vi.fn(() => ({ params: { id: "678-s" } }));

  vi.stubGlobal("useRoute", useRoute);

  const useState = vi.fn((_, value) => ref(value()));

  vi.stubGlobal("useState", useState);
};
