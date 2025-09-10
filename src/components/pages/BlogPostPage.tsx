import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getBlogPostById } from "../../utils/blogUtils";
import { getLocalizedTag } from "../../data/tagMapping";
import { texts, getCategoryLabel } from "../../data";
import MDXProvider from "../../mdx/MDXProvider";
import { lazy, Suspense, useMemo } from "react";

interface BlogPostPageProps {
  isDark: boolean;
  currentLang: string;
}

export const BlogPostPage = ({ isDark, currentLang }: BlogPostPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    navigate("/blog");
    return null;
  }

  const post = getBlogPostById(id);

  if (!post) {
    navigate("/blog");
    return null;
  }

  // MDX 컴포넌트 lazy 로더로 감싸기
  const LazyPost = useMemo(() => {
    if (!post.loadComponent) return null;
    return lazy(post.loadComponent);
  }, [post.loadComponent]);

  const postTitle = post.title[currentLang as keyof typeof post.title];
  const postExcerpt = post.excerpt[currentLang as keyof typeof post.excerpt];

  return (
    <div className="max-w-3xl mx-auto">
      <Helmet>
        <title>{postTitle} | Sol-namoo.blog</title>
        <meta name="description" content={postExcerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta name="author" content={post.author} />

        {/* Open Graph */}
        <meta property="og:title" content={postTitle} />
        <meta property="og:description" content={postExcerpt} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://sol-namoo.blog/blog/${post.id}`}
        />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.date} />
        {post.updatedAt && (
          <meta property="article:modified_time" content={post.updatedAt} />
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postTitle} />
        <meta name="twitter:description" content={postExcerpt} />
      </Helmet>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate("/blog")}
        className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
          isDark
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        {currentLang === "ko" ? "목록으로" : "Back to List"}
      </button>

      {/* 포스트 헤더 */}
      <article className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{post.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {post.title[currentLang as keyof typeof post.title]}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>📅 {new Date(post.date).toLocaleDateString()}</span>
              </div>
              {post.updatedAt && post.updatedAt !== post.date && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">
                    ✏️ {new Date(post.updatedAt).toLocaleDateString()} 수정
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 카테고리 및 태그 */}
        <div className="mb-6">
          <div className="flex items-start gap-2 mb-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                post.category === "retrospect"
                  ? isDark
                    ? "bg-purple-900/50 text-purple-300"
                    : "bg-purple-100 text-purple-800"
                  : post.category === "til"
                  ? isDark
                    ? "bg-blue-900/50 text-blue-300"
                    : "bg-blue-100 text-blue-800"
                  : isDark
                  ? "bg-green-900/50 text-green-300"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {getCategoryLabel(post.category, currentLang as "ko" | "en")}
            </span>
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="flex flex-wrap gap-2 min-w-0">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                      isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {getLocalizedTag(tag, currentLang)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 요약 */}
        <p
          className={`text-lg mb-6 leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {post.excerpt[currentLang as keyof typeof post.excerpt]}
        </p>
      </article>

      {/* 구분선 */}
      <div
        className={`w-full h-px mb-14 ${
          isDark ? "bg-gray-700" : "bg-gray-200"
        }`}
      />

      {/* MDX 콘텐츠 본문*/}
      <div
        className={`prose prose-lg max-w-none ${
          isDark
            ? "prose-invert prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-yellow-300 prose-a:text-blue-400"
            : "prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-amber-700 prose-a:text-blue-600"
        }`}
      >
        {LazyPost ? (
          <Suspense
            fallback={<div style={{ padding: "2rem 0" }}>Loading...</div>}
          >
            <MDXProvider>
              <LazyPost />
            </MDXProvider>
          </Suspense>
        ) : (
          <div className="text-center py-8">Unable to load content.</div>
        )}
      </div>
    </div>
  );
};
