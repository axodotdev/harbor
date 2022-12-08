import { createApp } from "vue";
import { AxoSwitch } from "@axodotdev/fringe/lib";

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
export const findSwitch = (wrapper) => wrapper.find('[role="switch"]');
export const findAxoSwitchToggledProp = (wrapper) =>
  wrapper.findComponent(AxoSwitch).props("toggled");
