import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/SvoyaIgra_JS/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@fonts": path.resolve(__dirname, "./public/fonts"),
      "@images": path.resolve(__dirname, "./public/images"),
      "@sounds": path.resolve(__dirname, "./public/sounds"),
    },
  },
});
