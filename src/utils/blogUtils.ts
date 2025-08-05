import matter from "gray-matter";
import { BlogPost } from "../types";

// 블로그 포스트들을 한 번에 import
import { blogPosts } from "../content/blog";

export const loadBlogPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];

  // 모든 블로그 파일 처리
  for (const { path, content } of blogPosts) {
    try {
      console.log(`처리 중인 파일: ${path}`);

      const { data, content: markdownContent } = matter(content);

      const post: BlogPost = {
        id: data.id,
        emoji: data.emoji || "📝",
        title: {
          ko: data.title_ko || data.title || "제목 없음",
          en: data.title_en || data.title || "No Title",
        },
        date: data.date || new Date().toISOString(),
        updatedAt: data.updatedAt,
        author: data.author || "Sol Lee",
        tags: data.tags || [],
        category: data.category || "til",
        excerpt: {
          ko: data.excerpt_ko || data.excerpt || "요약 없음",
          en: data.excerpt_en || data.excerpt || "No excerpt",
        },
        content: markdownContent || "",
      };

      posts.push(post);
    } catch (error) {
      console.error(`${path} 파싱 오류:`, error);
    }
  }

  // 날짜순으로 정렬 (최신순)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getBlogPostById = (id: string): BlogPost | undefined => {
  const posts = loadBlogPosts();
  return posts.find((post) => post.id === id);
};
