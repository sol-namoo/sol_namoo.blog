import { useParams } from "react-router-dom";
import { useState } from "react";
import { useLayout } from "../components/layout/Layout";
import { Layout } from "../components/layout/Layout";
import { BlogPage } from "../components/pages/BlogPage";
import { BlogPostPage } from "../components/pages/BlogPostPage";

const BlogContent = () => {
  const { isDark, currentLang } = useLayout();
  const { id } = useParams<{ id: string }>();

  // URL에 id가 있으면 개별 포스트 페이지를, 없으면 목록 페이지를 렌더링
  if (id) {
    return <BlogPostPage isDark={isDark} currentLang={currentLang} />;
  }

  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <BlogPage
      isDark={isDark}
      currentLang={currentLang}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      blogPosts={[]} // 빈 배열로 초기화
    />
  );
};

const Blog = () => {
  return (
    <Layout>
      <BlogContent />
    </Layout>
  );
};

export default Blog;
