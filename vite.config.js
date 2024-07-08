import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // потому, что будет на github в репозитории "SvoyaIgra_JS"
  base: "/SvoyaIgra_JS/",

  plugins: [react()],

  //подключаем пути-псевдонимы
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@fonts": path.resolve(__dirname, "./public/fonts"),
      "@images": path.resolve(__dirname, "./public/images"),
      "@sounds": path.resolve(__dirname, "./public/sounds"),
      "@media": path.resolve(__dirname, "./public/media"),
    },
  },

  // потому, хз почему. Чтобы работала загрузка данных из data.js
  assetsInclude: [
    "**/*.JPG",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.png",
    "**/*.gif",
    "**/*.webp",
    "**/*.svg",
    "**/*.mp3",
    "**/*.wav",
    "**/*.ogg",
    "**/*.aac",
  ],
});
