import { defineConfig } from "vite";

export default defineConfig({
  base: "/sport-tables/",
  build: {
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
