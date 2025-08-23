import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  Calendar,
  Users,
  TrendingUp,
  Code,
} from "lucide-react";

const TechTag = ({ tech, isDark }) => (
  <span
    className={`inline-block px-2 py-1 text-xs rounded-full transition-colors ${
      isDark
        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {tech}
  </span>
);

const ProjectCard = ({
  project,
  isDark,
  onViewDetails,
  currentLang = "en",
}) => (
  <div
    className={`group relative rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border ${
      isDark
        ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
        : "bg-white/70 border-gray-200 hover:bg-white/90 backdrop-blur-sm"
    }`}
  >
    {/* Thumbnail */}
    <div className="flex items-center justify-center w-12 h-12 text-2xl mb-3 rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100">
      {project.thumbnail}
    </div>

    {/* Header */}
    <div className="mb-3">
      <h3
        className={`text-lg font-bold mb-1 group-hover:text-orange-500 transition-colors ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {project.title}
      </h3>

      <div className="flex items-center gap-2 mb-1">
        {project.company && (
          <span
            className={`text-xs font-medium ${
              isDark ? "text-yellow-300" : "text-orange-600"
            }`}
          >
            {project.company}
          </span>
        )}
        <span
          className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          {project.role}
        </span>
      </div>

      <div className="flex items-center gap-1 mb-2">
        <Calendar className="w-3 h-3 text-gray-500" />
        <span className="text-xs text-gray-500">{project.period}</span>
      </div>
    </div>

    {/* Description */}
    <p
      className={`text-xs mb-3 line-clamp-2 ${
        isDark ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {project.description}
    </p>

    {/* Achievements */}
    <div className="mb-3">
      <div className="flex items-center gap-1 mb-1">
        <TrendingUp className="w-3 h-3 text-green-500" />
        <span
          className={`text-xs font-medium ${
            isDark ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {currentLang === "ko" ? "주요 성과" : "Key Achievements"}
        </span>
      </div>
      <ul className="space-y-1">
        {project.achievements.slice(0, 2).map((achievement, index) => (
          <li
            key={index}
            className={`text-xs flex items-start gap-2 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span className="text-green-500 mt-0.5">•</span>
            {
              achievement.summary[
                currentLang as keyof typeof achievement.summary
              ]
            }
          </li>
        ))}
      </ul>
    </div>

    {/* Tech Stack */}
    <div className="mb-4">
      <div className="flex items-center gap-1 mb-1">
        <Code className="w-3 h-3 text-blue-500" />
        <span
          className={`text-xs font-medium ${
            isDark ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {currentLang === "ko" ? "기술 스택" : "Tech Stack"}
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {project.techStack.slice(0, 3).map((tech, index) => (
          <TechTag key={index} tech={tech} isDark={isDark} />
        ))}
        {project.techStack.length > 3 && (
          <span
            className={`text-xs px-2 py-1 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-2">
      <button
        onClick={() => onViewDetails(project)}
        className={`flex-1 px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
          isDark
            ? "bg-orange-600 text-white hover:bg-orange-700"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        {currentLang === "ko" ? "상세 보기" : "View Details"}
      </button>

      <div className="flex gap-1">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            title="Live Site"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            title="GitHub"
          >
            <Github className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  </div>
);

export const PortfolioPage = ({
  isDark,
  currentLang = "en",
  projects = null,
}) => {
  // Use provided projects or fallback to empty arrays
  const professionalProjects = projects ? projects.professional : [];
  const personalProjects = projects ? projects.personal : [];
  const [selectedProject, setSelectedProject] = useState(null);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    const allProjects = [...professionalProjects, ...personalProjects];
    const currentIndex = allProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const nextIndex = (currentIndex + 1) % allProjects.length;
    setSelectedProject(allProjects[nextIndex]);
    // 스크롤을 페이지 상단으로 이동
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getNextProjectTitle = () => {
    const allProjects = [...professionalProjects, ...personalProjects];
    const currentIndex = allProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const nextIndex = (currentIndex + 1) % allProjects.length;
    return allProjects[nextIndex]?.title || "Next Project";
  };

  if (selectedProject) {
    return (
      <ProjectDetailView
        project={selectedProject}
        isDark={isDark}
        onBack={handleBackToList}
        onNextProject={handleNextProject}
        nextProjectTitle={getNextProjectTitle()}
        currentLang={currentLang}
      />
    );
  }

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1
          className={`text-4xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {currentLang === "ko" ? "포트폴리오" : "Portfolio"}
        </h1>
        <p
          className={`text-lg max-w-2xl mx-auto ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {currentLang === "ko"
            ? "프론트엔드 개발자로서의 여정을 보여주는 프로젝트 모음집입니다. 엔터프라이즈 플랫폼부터 개인 실험까지 다양한 경험을 담았습니다."
            : "A collection of projects that showcase my journey as a frontend developer, from enterprise platforms to personal experiments."}
        </p>
      </div>

      {/* Professional Experience Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {currentLang === "ko" ? "실무 경험" : "Professional Experience"}
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {currentLang === "ko"
              ? "전문적인 환경에서 개발된 엔터프라이즈급 프로젝트와 실제 서비스 애플리케이션들입니다."
              : "Enterprise-level projects and real-world applications developed in professional environments."}
          </p>
        </div>

        {professionalProjects.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {professionalProjects.map((project) => (
              <div key={project.id} className="w-full md:w-80 lg:w-96">
                <ProjectCard
                  project={project}
                  isDark={isDark}
                  onViewDetails={handleViewDetails}
                  currentLang={currentLang}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💼</div>
            <p
              className={`text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {currentLang === "ko"
                ? "실무 프로젝트가 없습니다."
                : "No professional projects available."}
            </p>
          </div>
        )}
      </section>

      {/* Personal Projects Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {currentLang === "ko" ? "개인 프로젝트" : "Personal Projects"}
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {currentLang === "ko"
              ? "창의성, 학습, 기술적 탐구를 보여주는 사이드 프로젝트와 실험들입니다."
              : "Side projects and experiments that demonstrate creativity, learning, and technical exploration."}
          </p>
        </div>

        {personalProjects.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {personalProjects.map((project) => (
              <div key={project.id} className="w-full md:w-80 lg:w-96">
                <ProjectCard
                  project={project}
                  isDark={isDark}
                  onViewDetails={handleViewDetails}
                  currentLang={currentLang}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <p
              className={`text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {currentLang === "ko"
                ? "개인 프로젝트가 없습니다."
                : "No personal projects available."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

// Project Detail View Component
const ProjectDetailView = ({
  project,
  isDark,
  onBack,
  onNextProject,
  nextProjectTitle,
  currentLang,
}) => {
  return (
    <div className="space-y-12">
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isDark
            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        ← Back to Portfolio
      </button>

      {/* Project Title & Meta */}
      <div className="space-y-3">
        <h1
          className={`text-4xl font-bold leading-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {project.title}
        </h1>
        <p
          className={`text-xl ${
            isDark ? "text-orange-300" : "text-orange-600"
          }`}
        >
          {project.role}, {project.company} | {project.period}
        </p>
      </div>

      {/* Overview Section */}
      <section className="space-y-6">
        <h2
          className={`text-2xl font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Overview
        </h2>
        <div
          className={`prose prose-lg max-w-none ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {project.overview && (
            <p className="leading-relaxed mb-6 whitespace-pre-line">
              {project.overview[currentLang as keyof typeof project.overview]}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div
              className={`p-5 rounded-lg border ${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="font-semibold mb-2">
                {currentLang === "ko" ? "팀 구성" : "Team Composition"}
              </div>
              <p className="text-base">
                {project.teamComposition
                  ? project.teamComposition[
                      currentLang as keyof typeof project.teamComposition
                    ]
                  : currentLang === "ko"
                  ? "정보 없음"
                  : "No information"}
              </p>
            </div>
            <div
              className={`p-5 rounded-lg border ${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="font-semibold mb-2">My Role</div>
              <p className="text-base">{project.role}</p>
            </div>
            <div
              className={`p-5 rounded-lg border ${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="font-semibold mb-2">Project Duration</div>
              <p className="text-base">{project.period}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements Section - 숫자/성과 중심 */}
      <section className="space-y-6">
        <h2
          className={`text-2xl font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Key Achievements
        </h2>
        <div className="space-y-3">
          {project.achievements.map((achievement, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-lg ${
                isDark ? "bg-gray-800/30" : "bg-gray-50/70"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isDark
                    ? "bg-orange-500/20 text-orange-300"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                <span className="text-sm font-bold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <p
                  className={`text-base leading-relaxed ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {
                    achievement.content[
                      currentLang as keyof typeof achievement.content
                    ]
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Solving Section - 데이터 기반 렌더링 */}
      {project.problemSolving && project.problemSolving.length > 0 && (
        <section className="space-y-6">
          <h2
            className={`text-2xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Problem Solving
          </h2>

          <div className="space-y-8">
            {project.problemSolving.map((item, index) => (
              <div key={index} className="space-y-4">
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.title[currentLang as keyof typeof item.title]}
                </h3>
                <div
                  className={`p-6 rounded-xl border ${
                    isDark
                      ? "bg-gray-800/30 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="space-y-4">
                    <div>
                      <span
                        className={`font-semibold ${
                          isDark ? "text-orange-300" : "text-orange-600"
                        }`}
                      >
                        Problem:{" "}
                      </span>
                      <span
                        className={isDark ? "text-gray-300" : "text-gray-700"}
                      >
                        {item.problem[currentLang as keyof typeof item.problem]}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`font-semibold ${
                          isDark ? "text-orange-300" : "text-orange-600"
                        }`}
                      >
                        Solution:{" "}
                      </span>
                      <span
                        className={isDark ? "text-gray-300" : "text-gray-700"}
                      >
                        {
                          item.solution[
                            currentLang as keyof typeof item.solution
                          ]
                        }
                      </span>
                    </div>
                    <div>
                      <span
                        className={`font-semibold ${
                          isDark ? "text-orange-300" : "text-orange-600"
                        }`}
                      >
                        Result:{" "}
                      </span>
                      <span
                        className={isDark ? "text-gray-300" : "text-gray-700"}
                      >
                        {item.result[currentLang as keyof typeof item.result]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech Stack & Notables Section */}
      <section className="space-y-6">
        <h2
          className={`text-2xl font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Tech Stack & Architecture
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className={`px-3 py-1.5 text-sm rounded-full border font-medium ${
                isDark
                  ? "bg-gray-800/50 border-gray-600 text-gray-300"
                  : "bg-gray-50 border-gray-200 text-gray-700"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Architecture Diagram */}
        {project.systemArchitecture && (
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              System Architecture
            </h3>
            <div
              className={`aspect-[16/9] rounded-xl border p-8 ${
                isDark
                  ? "border-gray-600 bg-gray-800/50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex justify-center items-center space-x-8">
                    {project.systemArchitecture.components.map(
                      (component, index) => (
                        <React.Fragment key={index}>
                          <div
                            className={`px-4 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {component}
                          </div>
                          {index <
                            project.systemArchitecture.components.length -
                              1 && (
                            <div
                              className={
                                isDark ? "text-gray-400" : "text-gray-500"
                              }
                            >
                              →
                            </div>
                          )}
                        </React.Fragment>
                      )
                    )}
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {project.systemArchitecture.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Screenshots / Demo Section */}
      <section className="space-y-6">
        <h2
          className={`text-2xl font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Screenshots / Demo
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className={`aspect-video rounded-xl border overflow-hidden ${
              isDark
                ? "border-gray-600 bg-gray-800"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">🖥️</div>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Desktop Interface
                </p>
              </div>
            </div>
          </div>
          <div
            className={`aspect-video rounded-xl border overflow-hidden ${
              isDark
                ? "border-gray-600 bg-gray-800"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">📱</div>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Mobile Responsive
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retrospective Section */}
      {project.category === "professional" ? (
        // Professional projects: Simple takeaway
        project.takeaway && (
          <section className="space-y-6">
            <h2
              className={`text-2xl font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Retrospective
            </h2>
            <div
              className={`p-6 rounded-xl border ${
                isDark
                  ? "bg-gray-800/30 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p
                className={`text-lg leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {project.takeaway[currentLang as keyof typeof project.takeaway]}
              </p>
            </div>
          </section>
        )
      ) : (
        // Personal projects: Full retrospective with What I Learned and Next Steps
        <section className="space-y-6">
          <h2
            className={`text-2xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Retrospective
          </h2>
          <div
            className={`grid gap-8 ${
              project.nextSteps && project.nextSteps.length > 0
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            <div
              className={`p-6 rounded-xl border ${
                isDark
                  ? "bg-gray-800/30 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                What I Learned
              </h3>
              <ul
                className={`space-y-3 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {project.whatILearned ? (
                  project.whatILearned.map((item, index) => (
                    <li key={index} className="leading-relaxed">
                      • {item}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="leading-relaxed">
                      • 대규모 React 애플리케이션에서의 성능 최적화 전략과 실무
                      적용 경험
                    </li>
                    <li className="leading-relaxed">
                      • SSR과 CSR의 적절한 조합을 통한 사용자 경험 개선 방법론
                    </li>
                    <li className="leading-relaxed">
                      • 팀 협업에서의 코드 리뷰와 품질 관리 프로세스의 중요성
                    </li>
                    <li className="leading-relaxed">
                      • 사용자 중심 사고를 통한 UI/UX 개선과 비즈니스 임팩트
                      창출
                    </li>
                  </>
                )}
              </ul>
            </div>
            {project.nextSteps && project.nextSteps.length > 0 && (
              <div
                className={`p-6 rounded-xl border ${
                  isDark
                    ? "bg-gray-800/30 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Next Steps
                </h3>
                <ul
                  className={`space-y-3 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {project.nextSteps.map((step, index) => (
                    <li key={index} className="leading-relaxed">
                      • {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Navigation */}
      <div
        className={`flex justify-between items-center pt-8 border-t ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isDark
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          ← Back to Portfolio
        </button>

        <div className="text-center">
          <p
            className={`text-sm mb-1 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Next Project
          </p>
          <button
            onClick={onNextProject}
            className={`text-base font-medium ${
              isDark ? "text-orange-300" : "text-orange-600"
            } hover:underline`}
          >
            {nextProjectTitle} →
          </button>
        </div>
      </div>
    </div>
  );
};
//   return (
//     <div className="flex items-start gap-4">
//       <div className="text-5xl">{project.thumbnail}</div>
//       <div className="flex-1">
//         <h1 className={`text-3xl font-bold mb-2 ${
//         <div className="flex items-start gap-4">
//           <div className="text-5xl">{project.thumbnail}</div>
//           <div className="flex-1">
//             <h1 className={`text-3xl font-bold mb-2 ${
//               isDark ? 'text-white' : 'text-gray-900'
//             }`}>
//               {project.title}
//             </h1>
//             <div className="flex items-center gap-3 mb-3">
//               {project.company && (
//                 <span className={`font-medium ${
//                   isDark ? 'text-yellow-300' : 'text-orange-600'
//                 }`}>
//                   {project.company}
//                 </span>
//               )}
//               <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                 {project.role}
//               </span>
//               <span className="text-gray-500">|</span>
//               <span className="text-gray-500">{project.period}</span>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               {project.liveUrl && (
//                 <a
//                   href={project.liveUrl}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
//                     isDark
//                       ? 'bg-orange-600 text-white hover:bg-orange-700'
//                       : 'bg-orange-500 text-white hover:bg-orange-600'
//                   }`}
//                 >
//                   <ExternalLink className="w-4 h-4" />
//                   Live Site
//                 </a>
//               )}

//               {project.githubUrl && (
//                 <a
//                   href={project.githubUrl}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
//                     isDark
//                       ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                   }`}
//                 >
//                   <Github className="w-4 h-4" />
//                   GitHub
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Project Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Overview */}
//           <section>
//             <h2 className={`text-2xl font-bold mb-4 ${
//               isDark ? 'text-white' : 'text-gray-900'
//             }`}>
//               Overview
//             </h2>
//             <p className={`text-lg leading-relaxed ${
//               isDark ? 'text-gray-300' : 'text-gray-600'
//             }`}>
//               {project.description}
//             </p>
//           </section>

//           {/* Key Achievements */}
//           <section>
//             <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
//               isDark ? 'text-white' : 'text-gray-900'
//             }`}>
//               <TrendingUp className="w-6 h-6 text-green-500" />
//               Key Achievements
//             </h2>
//             <ul className="space-y-3">
//               {project.achievements.map((achievement, index) => (
//                 <li key={index} className={`flex items-start gap-3 ${
//                   isDark ? 'text-gray-300' : 'text-gray-600'
//                 }`}>
//                   <span className="text-green-500 mt-1">✓</span>
//                   <span className="text-lg">{achievement}</span>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Tech Stack & Architecture */}
//           <section>
//             <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
//               isDark ? 'text-white' : 'text-gray-900'
//             }`}>
//               <Code className="w-6 h-6 text-blue-500" />
//               Tech Stack & Architecture
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {project.techStack.map((tech, index) => (
//                 <div key={index} className={`p-3 rounded-lg border text-center font-medium ${
//                   isDark
//                     ? 'bg-gray-800 border-gray-700 text-gray-300'
//                     : 'bg-white border-gray-200 text-gray-700'
//                 }`}>
//                   {tech}
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Project Stats */}
//           <div className={`p-6 rounded-2xl border ${
//             isDark
//               ? 'bg-gray-800/50 border-gray-700'
//               : 'bg-white/70 border-gray-200'
//           }`}>
//             <h3 className={`font-bold mb-4 ${
//               isDark ? 'text-white' : 'text-gray-900'
//             }`}>
//               Project Info
//             </h3>
//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Duration</span>
//                 <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
//                   {project.period}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Role</span>
//                 <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
//                   {project.role}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Type</span>
//                 <span className={`capitalize ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                   {project.category}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Quick Tech List */}
//           <div className={`p-6 rounded-2xl border ${
//             isDark
//               ? 'bg-gray-800/50 border-gray-700'
//               : 'bg-white/70 border-gray-200'
//           }`}>
//             <h3 className={`font-bold mb-4 ${
//               isDark ? 'text-white' : 'text-gray-900'
//             }`}>
//               Technologies
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {project.techStack.map((tech, index) => (
//                 <TechTag key={index} tech={tech} isDark={isDark} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
