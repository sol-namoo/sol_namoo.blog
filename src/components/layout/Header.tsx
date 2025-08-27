import { Sun, Moon, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogoText } from "../common/LogoText";
import { YellowMenuStroke } from "../common/YellowMenuStroke";
import { GreenBorderStroke } from "../common/GreenBorderStroke";

interface HeaderProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  t: any;
}

export const Header = ({
  isDark,
  setIsDark,
  currentLang,
  setCurrentLang,
  currentPage,
  setCurrentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
  t,
}: HeaderProps) => {
  const navigate = useNavigate();

  // URL에서 현재 페이지 추출 (props에서 받은 currentPage 사용)

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors relative ${
        isDark ? "bg-gray-900/80" : "bg-white/70"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center cursor-default hover:scale-105 transition-transform">
            <div className="flex items-baseline space-x-1">
              <LogoText isDark={isDark} />
              <span
                className={`text-lg font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                .blog
              </span>
            </div>
          </div>

          {/* 데스크톱 네비게이션 - sm 브레이크포인트에서 숨김 */}
          <nav className="hidden sm:flex items-center space-x-8">
            {Object.entries(t.nav).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handlePageChange(key)}
                className={`relative font-medium transition-colors hover:scale-105 px-4 py-2 ${
                  currentPage === key
                    ? isDark
                      ? "text-yellow-300"
                      : "text-amber-700"
                    : isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {/* 활성 메뉴 배경 스트로크 */}
                {currentPage === key && (
                  <div className="absolute inset-0 -z-10">
                    <YellowMenuStroke />
                  </div>
                )}
                {String(label)}
              </button>
            ))}
          </nav>

          {/* 컨트롤 버튼들 */}
          <div className="flex items-center space-x-3">
            {/* 언어 토글 */}
            <button
              onClick={() => setCurrentLang(currentLang === "ko" ? "en" : "ko")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {currentLang === "ko" ? "EN" : "한글"}
            </button>

            {/* 다크모드 토글 */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-colors ${
                isDark
                  ? "bg-yellow-500 text-yellow-900 hover:bg-yellow-400"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* 모바일 메뉴 버튼 - sm 브레이크포인트에서 표시 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-full transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 - sm 브레이크포인트에서 숨김 */}
        {mobileMenuOpen && (
          <div
            className={`sm:hidden mt-4 py-4 border-t ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <nav className="flex flex-col space-y-2">
              {Object.entries(t.nav).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    handlePageChange(key);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === key
                      ? isDark
                        ? "bg-yellow-600 text-white"
                        : "bg-amber-500 text-white"
                      : isDark
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {String(label)}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* GNB 하단 경계 스트로크 */}
      <GreenBorderStroke isDark={isDark} />
    </header>
  );
};
