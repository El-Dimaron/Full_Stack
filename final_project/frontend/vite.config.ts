import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const backendUrl = process.env.VITE_BACKEND_URL ?? "http://localhost:3000";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    strictPort: true,

    watch: {
      usePolling: true,
    },

    proxy: {
      "/api": {
        target: backendUrl,
        changeOrigin: true,
      },
      "/uploads": {
        target: backendUrl,
        changeOrigin: true,
      },
    },
  },

  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
