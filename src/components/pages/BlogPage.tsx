import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalizedTag } from "../../data/tagMapping";
import { BlogPost } from "../../types";
import { loadBlogPosts } from "../../utils/blogUtils";
import { getCategoryLabel } from "../../data";

interface BlogPageProps {
  isDark: boolean;
  currentLang: string;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  blogPosts: BlogPost[];
}

export const BlogPage = ({
  isDark,
  currentLang,
  selectedCategory,
  setSelectedCategory,
  blogPosts: externalBlogPosts,
}: BlogPageProps) => {
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
          {currentLang === "ko"
            ? "블로그 포스트를 불러오는 중..."
            : "Loading blog posts..."}
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
            {currentLang === "ko" ? "카테고리" : "Categories"}
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              key="all"
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
              {currentLang === "ko" ? "전체" : "All"} ({blogPosts.length})
            </button>
            {availableCategories.map((category: string) => {
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
                  {getCategoryLabel(
                    category as any,
                    currentLang as "ko" | "en"
                  )}{" "}
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
            {currentLang === "ko" ? "태그" : "Tags"}
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
        {currentLang === "ko"
          ? `${filteredPosts.length}개의 포스트`
          : `${filteredPosts.length} post${
              filteredPosts.length !== 1 ? "s" : ""
            }`}
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
              className={`h-24 sm:h-32 flex items-center justify-center text-2xl sm:text-4xl relative ${
                isDark ? "bg-gray-700/30" : "bg-gray-50/80"
              }`}
            >
              {/* 카테고리 배지 - 왼쪽 상단 */}
              <span
                className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                  post.category === "retrospect"
                    ? isDark
                      ? "bg-purple-900/80 text-purple-300"
                      : "bg-purple-100/90 text-purple-800"
                    : post.category === "til"
                    ? isDark
                      ? "bg-blue-900/80 text-blue-300"
                      : "bg-blue-100/90 text-blue-800"
                    : post.category === "review"
                    ? isDark
                      ? "bg-green-900/80 text-green-300"
                      : "bg-green-100/90 text-green-800"
                    : post.category === "tutorial"
                    ? isDark
                      ? "bg-orange-900/80 text-orange-300"
                      : "bg-orange-100/90 text-orange-800"
                    : post.category === "thought"
                    ? isDark
                      ? "bg-pink-900/80 text-pink-300"
                      : "bg-pink-100/90 text-pink-800"
                    : post.category === "project"
                    ? isDark
                      ? "bg-indigo-900/80 text-indigo-300"
                      : "bg-indigo-100/90 text-indigo-800"
                    : isDark
                    ? "bg-gray-900/80 text-gray-300"
                    : "bg-gray-100/90 text-gray-800"
                }`}
              >
                {getCategoryLabel(post.category, currentLang as "ko" | "en")}
              </span>
              {post.emoji || "📝"}
            </div>

            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-base sm:text-lg mb-2">
                {post.title &&
                post.title[currentLang as keyof typeof post.title]
                  ? post.title[currentLang as keyof typeof post.title]
                  : currentLang === "ko"
                  ? "제목 없음"
                  : "No Title"}
              </h3>
              <p
                className={`text-xs sm:text-sm mb-4 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {post.excerpt &&
                post.excerpt[currentLang as keyof typeof post.excerpt]
                  ? post.excerpt[currentLang as keyof typeof post.excerpt]
                  : currentLang === "ko"
                  ? "요약 없음"
                  : "No excerpt"}
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 min-h-[1.5rem]">
                {post.tags &&
                  post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
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
                <span>
                  {post.author || (currentLang === "ko" ? "작성자" : "Author")}
                </span>
                <div className="flex flex-col items-end">
                  <span>
                    📅{" "}
                    {post.date
                      ? new Date(post.date).toLocaleDateString()
                      : currentLang === "ko"
                      ? "날짜 없음"
                      : "No date"}
                  </span>
                  {post.updatedAt && post.updatedAt !== post.date && (
                    <span className="text-xs text-gray-400">
                      ✏️ {new Date(post.updatedAt).toLocaleDateString()}{" "}
                      {currentLang === "ko" ? "수정" : "updated"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
