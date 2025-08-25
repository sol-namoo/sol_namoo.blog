// utils/blogUtils.ts
import type { ComponentType } from "react";
import type { BlogPost } from "../types";

// 1) 메타만 즉시 로드 (named export만 import)
const metaModules = import.meta.glob("../content/blog/*.mdx", {
  eager: true,
  import: "meta",
}) as Record<string, any>;

// 2) 컴포넌트는 지연 로드 (필요할 때 동적 import)
const componentModules = import.meta.glob("../content/blog/*.mdx"); // () => Promise<Module>

export const loadBlogPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];

  for (const [path, meta] of Object.entries(metaModules)) {
    const slug = path.split("/").pop()!.replace(".mdx", "");

    // 해당 파일의 컴포넌트 importer 함수 찾기
    const importer = componentModules[path]; // ()=>Promise<{ default: Component }>

    posts.push({
      id: meta.id || slug,
      emoji: meta.emoji || "📝",
      title: {
        ko: meta.title_ko || meta.title || "제목 없음",
        en: meta.title_en || meta.title || "No Title",
      },
      date: meta.date || new Date().toISOString(),
      updatedAt: meta.updatedAt,
      author: meta.author || "Sol Lee",
      tags: meta.tags || [],
      category: meta.category || "til",
      excerpt: {
        ko: meta.excerpt_ko || meta.excerpt || "요약 없음",
        en: meta.excerpt_en || meta.excerpt || "No excerpt",
      },
      slug,
      path,
      // 🔽 상세 페이지에서 사용할 지연 로더
      loadComponent: importer as () => Promise<{ default: ComponentType<any> }>,
    });
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getBlogPostById = (id: string): BlogPost | undefined => {
  const posts = loadBlogPosts();
  return posts.find((post) => post.id === id);
};
