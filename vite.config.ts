import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    open: true,
  },
  assetsInclude: ["**/*.md"],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
  optimizeDeps: {
    include: ["buffer"],
  },
  // 마크다운 파일을 raw 텍스트로 처리
  build: {
    rollupOptions: {
      external: [],
    },
  },
});
