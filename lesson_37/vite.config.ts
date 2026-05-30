import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    tailwindcss(),
    visualizer({
      filename: "dist/stats.html",
      open: true,
    }),
  ],
});
