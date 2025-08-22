import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "append" }],
      ],
    }),
    react(),
  ],
  server: { port: 3003, open: true },
  // ⛔ assetsInclude 제거
  define: { global: "globalThis" },
  resolve: { alias: { buffer: "buffer" } },
  optimizeDeps: { include: ["buffer"] },
  build: { rollupOptions: { external: [] } },
});
