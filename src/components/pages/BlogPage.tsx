import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { loadBlogPosts } from "../../utils/blogUtils";
import {
  getLocalizedTag,
  categoryMapping,
  getAllTags,
} from "../../data/tagMapping";
import { BlogPost } from "../../types";

interface BlogPageProps {
  isDark: boolean;
  currentLang: string;
  t: any;
}

export const BlogPage = ({ isDark, currentLang, t }: BlogPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // 실제 마크다운 파일에서 블로그 포스트 로드
      const posts = loadBlogPosts();
      console.log("BlogPage - blogPosts:", posts);

      if (posts.length === 0) {
        setError("블로그 포스트를 찾을 수 없습니다.");
      } else {
        setBlogPosts(posts);
      }
    } catch (err) {
      console.error("블로그 포스트 로딩 오류:", err);
      setError("블로그 포스트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 실제 포스트가 있는 카테고리만 계산
  const availableCategories = useMemo(() => {
    const categories = new Set(blogPosts.map((post) => post.category));
    return Array.from(categories);
  }, [blogPosts]);

  // 실제 포스트에 사용된 태그만 계산
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [blogPosts]);

  const filteredPosts = blogPosts.filter((post) => {
    // 카테고리 필터
    if (selectedCategory !== "all" && post.category !== selectedCategory) {
      return false;
    }

    // 태그 필터
    if (selectedTags.length > 0) {
      const postTags = post.tags || [];
      return selectedTags.every((tag) => postTags.includes(tag));
    }

    return true;
  });

  const handlePostClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          블로그 포스트를 불러오는 중...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className={`text-lg ${isDark ? "text-red-400" : "text-red-600"}`}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 필터 섹션 */}
      <div className="space-y-4">
        {/* 카테고리 필터 */}
        <div>
          <h3
            className={`text-sm font-medium mb-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            카테고리
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryClick("all")}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-all ${
                selectedCategory === "all"
                  ? isDark
                    ? "bg-yellow-600 text-white"
                    : "bg-amber-500 text-white"
                  : isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              전체 ({blogPosts.length})
            </button>
            {availableCategories.map((category) => {
              const count = blogPosts.filter(
                (post) => post.category === category
              ).length;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-all ${
                    selectedCategory === category
                      ? isDark
                        ? "bg-yellow-600 text-white"
                        : "bg-amber-500 text-white"
                      : isDark
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {categoryMapping[category as keyof typeof categoryMapping]
                    ? categoryMapping[category as keyof typeof categoryMapping][
                        currentLang as "ko" | "en"
                      ]
                    : category}{" "}
                  ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 태그 필터 */}
        <div>
          <h3
            className={`text-sm font-medium mb-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            태그
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-2 py-1 rounded text-xs transition-all ${
                  selectedTags.includes(tag)
                    ? isDark
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : isDark
                    ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {getLocalizedTag(tag, currentLang)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 포스트 개수 표시 */}
      <p
        className={`mb-6 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        {filteredPosts.length}개의 포스트
      </p>

      {/* 블로그 포스트 목록 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className={`rounded-xl overflow-hidden transition-all hover:scale-105 border cursor-pointer ${
              isDark
                ? "bg-gray-800/30 border-gray-700 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/10"
                : "bg-white/60 border-gray-200 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/10"
            }`}
          >
            <div
              className={`h-24 sm:h-32 flex items-center justify-center text-2xl sm:text-4xl ${
                isDark ? "bg-gray-700/30" : "bg-gray-50/80"
              }`}
            >
              {post.emoji || "📝"}
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-base sm:text-lg">
                  {post.title &&
                  post.title[currentLang as keyof typeof post.title]
                    ? post.title[currentLang as keyof typeof post.title]
                    : "제목 없음"}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    post.category === "retrospect"
                      ? isDark
                        ? "bg-purple-900/50 text-purple-300"
                        : "bg-purple-100 text-purple-800"
                      : post.category === "til"
                      ? isDark
                        ? "bg-blue-900/50 text-blue-300"
                        : "bg-blue-100 text-blue-800"
                      : post.category === "review"
                      ? isDark
                        ? "bg-green-900/50 text-green-300"
                        : "bg-green-100 text-green-800"
                      : post.category === "tutorial"
                      ? isDark
                        ? "bg-orange-900/50 text-orange-300"
                        : "bg-orange-100 text-orange-800"
                      : post.category === "thought"
                      ? isDark
                        ? "bg-pink-900/50 text-pink-300"
                        : "bg-pink-100 text-pink-800"
                      : post.category === "project"
                      ? isDark
                        ? "bg-indigo-900/50 text-indigo-300"
                        : "bg-indigo-100 text-indigo-800"
                      : isDark
                      ? "bg-gray-900/50 text-gray-300"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {categoryMapping[
                    post.category as keyof typeof categoryMapping
                  ]
                    ? categoryMapping[
                        post.category as keyof typeof categoryMapping
                      ][currentLang as "ko" | "en"]
                    : post.category}
                </span>
              </div>
              <p
                className={`text-xs sm:text-sm mb-4 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {post.excerpt &&
                post.excerpt[currentLang as keyof typeof post.excerpt]
                  ? post.excerpt[currentLang as keyof typeof post.excerpt]
                  : "요약 없음"}
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                {post.tags &&
                  post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        isDark
                          ? "bg-green-900/50 text-green-300"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {getLocalizedTag(tag, currentLang)}
                    </span>
                  ))}
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{post.author || "작성자"}</span>
                <span>
                  {post.date
                    ? new Date(post.date).toLocaleDateString()
                    : "날짜 없음"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
