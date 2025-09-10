import React, { useState, createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { texts } from "../../data";

// Context 생성
interface LayoutContextType {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: any;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a Layout");
  }
  return context;
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
  const location = useLocation();

  // URL에서 현재 페이지 추출
  const getCurrentPageFromPath = (pathname: string) => {
    const path = pathname.split("/")[1]; // '/blog' -> 'blog'
    return path || "blog";
  };

  // 언어 설정이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("currentLang", currentLang);
  }, [currentLang]);

  // 다크모드 설정이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("isDark", isDark.toString());
  }, [isDark]);

  const t = texts[currentLang as keyof typeof texts];

  const contextValue: LayoutContextType = {
    isDark,
    setIsDark,
    currentLang,
    setCurrentLang,
    t,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <Helmet>
        <title>Sol-namoo.blog - Developer Portfolio & Blog</title>
        <meta
          name="description"
          content="Sol Lee's developer blog and portfolio. Sharing experiences in frontend development, React, TypeScript, and more."
        />
        <meta
          name="keywords"
          content="developer, blog, portfolio, react, typescript, frontend, web development"
        />
        <meta name="author" content="Sol Lee" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Sol-namoo.blog - Developer Portfolio & Blog"
        />
        <meta
          property="og:description"
          content="Sol Lee's developer blog and portfolio. Sharing experiences in frontend development, React, TypeScript, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sol-namoo.blog" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sol-namoo.blog - Developer Portfolio & Blog"
        />
        <meta
          name="twitter:description"
          content="Sol Lee's developer blog and portfolio. Sharing experiences in frontend development, React, TypeScript, and more."
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Cursive:wght@500&display=swap"
          rel="stylesheet"
        />
      </Helmet>

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
          currentPage={getCurrentPageFromPath(location.pathname)}
          setCurrentPage={() => {
            // 페이지 변경 로직은 상위 컴포넌트에서 처리
          }}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          t={t}
        />

        {/* 메인 콘텐츠 */}
        <main className="max-w-6xl mx-auto px-8 py-8">{children}</main>

        {/* 푸터 */}
        <Footer isDark={isDark} t={t} />
      </div>
    </LayoutContext.Provider>
  );
};
