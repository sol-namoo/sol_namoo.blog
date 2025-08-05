import matter from "gray-matter";
import { BlogPost } from "../types";

// 마크다운 파일을 직접 import
import reflectionsPost from "../content/blog/reflections-on-first-two-years.md?raw";

export const loadBlogPosts = (): BlogPost[] => {
  console.log("=== loadBlogPosts 시작 ===");

  const posts: BlogPost[] = [];

  try {
    // gray-matter로 파싱
    let { data, content } = matter(reflectionsPost);
    console.log("gray-matter 파싱된 data:", data);
    console.log("gray-matter 파싱된 content 길이:", content.length);
    console.log(
      "gray-matter 파싱된 content (처음 200자):",
      content.substring(0, 200)
    );

    // 필수 필드가 없으면 기본값 설정
    const post: BlogPost = {
      id: data.id,
      emoji: data.emoji || "📝",
      title: {
        ko: data.title_ko || data.title || "제목 없음",
        en: data.title_en || data.title || "No Title",
      },
      date: data.date || new Date().toISOString(),
      updatedAt: data.updatedAt, // 수정일 (선택사항)
      author: data.author || "Sol Lee",
      tags: data.tags || [],
      category: data.category || "til",
      excerpt: {
        ko: data.excerpt_ko || data.excerpt || "요약 없음",
        en: data.excerpt_en || data.excerpt || "No excerpt",
      },
      content: content || "",
    };

    posts.push(post);
  } catch (error) {
    console.error("파일 파싱 오류:", error);
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
