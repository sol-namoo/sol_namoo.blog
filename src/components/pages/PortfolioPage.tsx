import { useState, useMemo } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "../../types";

interface PortfolioPageProps {
  isDark: boolean;
  currentLang: string;
  projects: Project[];
}

export const PortfolioPage = ({
  isDark,
  currentLang,
  projects,
}: PortfolioPageProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  // 실제 프로젝트에 사용된 기술 스택만 계산
  const availableTech = useMemo(() => {
    const tech = new Set<string>();
    projects.forEach((project) => {
      project.tech?.forEach((t) => tech.add(t));
    });
    return Array.from(tech);
  }, [projects]);

  // 필터링 함수
  const filteredProjects = projects.filter((project) => {
    // 프로젝트 타입 필터
    if (selectedFilter === "all") {
      // 기본 필터는 통과
    } else if (selectedFilter === "work") {
      if (project.type !== "work") return false;
    } else if (selectedFilter === "side") {
      if (project.type !== "side") return false;
    } else if (selectedFilter === "personal") {
      if (project.type !== "personal") return false;
    } else if (selectedFilter === "individual") {
      if (project.team !== "individual") return false;
    } else if (selectedFilter === "team") {
      if (project.team !== "team") return false;
    }

    // 기술 스택 필터 (AND 조건)
    if (selectedTech.length > 0) {
      const projectTech = project.tech || [];
      return selectedTech.every((tech) => projectTech.includes(tech));
    }

    return true;
  });

  const filters = [
    { key: "all", label: { ko: "전체", en: "All" } },
    { key: "work", label: { ko: "실무 프로젝트", en: "Work Projects" } },
    { key: "side", label: { ko: "사이드 프로젝트", en: "Side Projects" } },
    {
      key: "personal",
      label: { ko: "개인 프로젝트", en: "Personal Projects" },
    },
    { key: "individual", label: { ko: "개인 작업", en: "Individual Work" } },
    { key: "team", label: { ko: "팀 작업", en: "Team Work" } },
  ];

  const handleTechClick = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  // 프로젝트가 없을 때 표시할 메시지
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div
          className={`text-6xl ${isDark ? "text-gray-600" : "text-gray-300"}`}
        >
          🚧
        </div>
        <div
          className={`text-xl font-medium ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {currentLang === "ko" ? "업로드를 준비중" : "Upload in Progress"}
        </div>
        <div
          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          {currentLang === "ko"
            ? "곧 멋진 프로젝트들을 만나보실 수 있습니다!"
            : "You'll be able to see amazing projects soon!"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 필터 섹션 */}
      <div className="space-y-4">
        {/* 프로젝트 타입 필터 */}
        <div>
          <h3
            className={`text-sm font-medium mb-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {currentLang === "ko" ? "프로젝트 타입" : "Project Type"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-all ${
                  selectedFilter === filter.key
                    ? isDark
                      ? "bg-yellow-600 text-white"
                      : "bg-amber-500 text-white"
                    : isDark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filter.label[currentLang as keyof typeof filter.label]}
              </button>
            ))}
          </div>
        </div>

        {/* 기술 스택 필터 */}
        {availableTech.length > 0 && (
          <div>
            <h3
              className={`text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {currentLang === "ko" ? "기술 스택" : "Tech Stack"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableTech.map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechClick(tech)}
                  className={`px-2 py-1 rounded text-xs transition-all ${
                    selectedTech.includes(tech)
                      ? isDark
                        ? "bg-green-600 text-white"
                        : "bg-green-500 text-white"
                      : isDark
                      ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 결과 카운트 */}
      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {filteredProjects.length}개의 프로젝트
      </p>

      {/* 프로젝트 그리드 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`rounded-xl overflow-hidden transition-all hover:scale-105 border ${
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
              {project.image}
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-base sm:text-lg">
                  {project.title[currentLang as keyof typeof project.title]}
                </h3>
                {/* 프로젝트 타입 배지 */}
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    project.type === "work"
                      ? isDark
                        ? "bg-blue-900/50 text-blue-300"
                        : "bg-blue-100 text-blue-800"
                      : project.type === "side"
                      ? isDark
                        ? "bg-purple-900/50 text-purple-300"
                        : "bg-purple-100 text-purple-800"
                      : isDark
                      ? "bg-orange-900/50 text-orange-300"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {project.type === "work"
                    ? currentLang === "ko"
                      ? "실무"
                      : "Work"
                    : project.type === "side"
                    ? currentLang === "ko"
                      ? "사이드"
                      : "Side"
                    : currentLang === "ko"
                    ? "개인"
                    : "Personal"}
                </span>
              </div>

              <p
                className={`text-xs sm:text-sm mb-4 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {
                  project.description[
                    currentLang as keyof typeof project.description
                  ]
                }
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      isDark
                        ? "bg-green-900/50 text-green-300"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a
                  href={project.github}
                  className={`flex items-center justify-center px-3 py-2 rounded text-xs sm:text-sm font-medium transition-colors ${
                    isDark
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <Github className="w-4 h-4 mr-1" />
                  Code
                </a>
                <a
                  href={project.demo}
                  className={`flex items-center justify-center px-3 py-2 rounded text-xs sm:text-sm font-medium transition-colors ${
                    isDark
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
