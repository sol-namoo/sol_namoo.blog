import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { BlogPage } from "./pages/BlogPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { AboutPage } from "./pages/AboutPage";
import { texts, blogPosts, projects, skills } from "../data";
import { BlogPost, Project, Skill } from "../types";

const SolDevPortfolio = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // localStorage에서 언어 설정 불러오기
  const getInitialLang = () => {
    const savedLang = localStorage.getItem("currentLang");
    return savedLang === "ko" || savedLang === "en" ? savedLang : "en";
  };

  // localStorage에서 다크모드 설정 불러오기
  const getInitialDarkMode = () => {
    const savedDarkMode = localStorage.getItem("isDark");
    return savedDarkMode === "true";
  };

  const [isDark, setIsDark] = useState(getInitialDarkMode);
  const [currentLang, setCurrentLang] = useState(getInitialLang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // URL에서 현재 페이지 추출
  const getCurrentPageFromPath = (pathname: string) => {
    const path = pathname.split("/")[1]; // '/blog' -> 'blog'
    return path || "blog";
  };

  const currentPage = getCurrentPageFromPath(location.pathname);

  // 언어 설정이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("currentLang", currentLang);
  }, [currentLang]);

  // 다크모드 설정이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("isDark", isDark.toString());
  }, [isDark]);

  // 페이지 변경 시 URL 업데이트
  const setCurrentPage = (page: string) => {
    navigate(`/${page}`);
  };

  // URL 변경 시 페이지 상태 동기화
  useEffect(() => {
    const page = getCurrentPageFromPath(location.pathname);
    if (page !== currentPage) {
      // URL이 변경되었지만 상태는 이미 동기화되어 있음
    }
  }, [location.pathname]);

  const t = texts[currentLang as keyof typeof texts];

  return (
    <>
      {/* Google Fonts 로드 */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-yellow-50/30 via-amber-50/20 to-green-50/30 text-gray-900"
        }`}
      >
        {/* 헤더 */}
        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          t={t}
        />

        {/* 메인 콘텐츠 */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {currentPage === "blog" && (
            <BlogPage
              isDark={isDark}
              currentLang={currentLang}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              blogPosts={[]} // BlogPage 내부에서 직접 로드하므로 빈 배열 전달
            />
          )}
          {currentPage === "portfolio" && (
            <PortfolioPage
              isDark={isDark}
              currentLang={currentLang}
              projects={projects}
            />
          )}
          {currentPage === "about" && (
            <AboutPage
              isDark={isDark}
              currentLang={currentLang}
              t={t}
              skills={skills}
            />
          )}
        </main>

        {/* 푸터 */}
        <Footer isDark={isDark} t={t} />
      </div>
    </>
  );
};

export default SolDevPortfolio;
