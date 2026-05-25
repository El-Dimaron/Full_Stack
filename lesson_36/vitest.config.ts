import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
    },
    exclude: [...configDefaults.exclude, "package/template/*", "dist/"],
  },
});
