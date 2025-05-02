import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  //   server: {
  //     open: true,
  //   },
});
