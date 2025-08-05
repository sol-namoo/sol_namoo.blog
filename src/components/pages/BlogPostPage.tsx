import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { getBlogPostById } from "../../utils/blogUtils";
import { getLocalizedTag } from "../../data/tagMapping";
import { BlogPost } from "../../types";

interface BlogPostPageProps {
  isDark: boolean;
  currentLang: string;
  t: any;
}

export const BlogPostPage = ({ isDark, currentLang, t }: BlogPostPageProps) => {
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

  return (
    <div className="max-w-4xl mx-auto">
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
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 카테고리 및 태그 */}
        <div className="flex items-center gap-2 mb-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
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
            {post.category === "retrospect"
              ? currentLang === "ko"
                ? "회고"
                : "Retrospect"
              : post.category === "til"
              ? "TIL"
              : currentLang === "ko"
              ? "리뷰"
              : "Review"}
          </span>
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 rounded text-xs font-medium ${
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

        {/* 요약 */}
        <p
          className={`text-lg mb-8 leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {post.excerpt[currentLang as keyof typeof post.excerpt]}
        </p>
      </article>

      {/* 마크다운 콘텐츠 */}
      <div
        className={`prose prose-lg max-w-none ${
          isDark
            ? "prose-invert prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-yellow-300 prose-a:text-blue-400"
            : "prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-amber-700 prose-a:text-blue-600"
        }`}
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
};
