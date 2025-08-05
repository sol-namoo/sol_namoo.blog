import { useParams } from "react-router-dom";
import { useLayout } from "../components/layout/Layout";
import { Layout } from "../components/layout/Layout";
import { BlogPage } from "../components/pages/BlogPage";
import { BlogPostPage } from "../components/pages/BlogPostPage";
import { texts } from "../data";

const BlogContent = () => {
  const { isDark, currentLang } = useLayout();
  const { id } = useParams<{ id: string }>();

  // URL에 id가 있으면 개별 포스트 페이지를, 없으면 목록 페이지를 렌더링
  if (id) {
    return (
      <BlogPostPage
        isDark={isDark}
        currentLang={currentLang}
        t={texts[currentLang as keyof typeof texts]}
      />
    );
  }

  return (
    <BlogPage
      isDark={isDark}
      currentLang={currentLang}
      t={texts[currentLang as keyof typeof texts]}
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
