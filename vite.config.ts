import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    host: true,
    port: 3000,
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@/": "/src/",
    },
  },
  build: {
    outDir: "build",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
