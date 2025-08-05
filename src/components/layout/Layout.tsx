import React, { useState, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
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
  const [isDark, setIsDark] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // URL에서 현재 페이지 추출
  const getCurrentPageFromPath = (pathname: string) => {
    const path = pathname.split("/")[1]; // '/blog' -> 'blog'
    return path || "blog";
  };

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
          currentPage={getCurrentPageFromPath(location.pathname)}
          setCurrentPage={() => {
            // 페이지 변경 로직은 상위 컴포넌트에서 처리
          }}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          t={t}
        />

        {/* 메인 콘텐츠 */}
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        {/* 푸터 */}
        <Footer isDark={isDark} t={t} />
      </div>
    </LayoutContext.Provider>
  );
};
