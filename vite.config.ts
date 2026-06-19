import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/ahmad-alabdalla/",
  plugins: [react()],
  server: {
    port: 5178,
  },
});
