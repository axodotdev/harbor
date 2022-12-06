import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    setupFiles: "./utils/test-setup.js",
    globals: true,
    environment: "happy-dom",
  },
  resolve: {
    dedupe: ["vue"],
  },
  root: ".",
});
