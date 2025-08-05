import { Project, Skill, Texts, BlogPost } from "../types";

export const texts: Texts = {
  ko: {
    nav: {
      blog: "블로그",
      portfolio: "포트폴리오",
      about: "소개",
    },
    blog: {
      title: "블로그",
      categories: {
        all: "전체",
        retrospect: "회고",
        til: "TIL",
        review: "리뷰",
        tutorial: "튜토리얼",
        thought: "생각",
        project: "프로젝트",
      },
    },
    portfolio: {
      title: "포트폴리오",
    },
    about: {
      title: "소개",
      greeting: "안녕하세요!",
      name: "솔나무",
      jobTitle: "프론트엔드 개발자",
      description:
        "사용자 경험을 중시하는 개발자입니다. 깔끔하고 직관적인 인터페이스를 만드는 것을 좋아하며, 새로운 기술을 배우는 것에 항상 열정을 가지고 있습니다.",
      skills: "기술 스택",
      contact: "연락처",
    },
    footer: {
      rights: "© 2025 Sol-namoo.blog",
    },
  },
  en: {
    nav: {
      blog: "Blog",
      portfolio: "Portfolio",
      about: "About",
    },
    blog: {
      title: "Blog",
      categories: {
        all: "All",
        retrospect: "Retrospect",
        til: "TIL",
        review: "Review",
        tutorial: "Tutorial",
        thought: "Thought",
        project: "Project",
      },
    },
    portfolio: {
      title: "Portfolio",
    },
    about: {
      title: "About",
      greeting: "Hello!",
      name: "Sol-Namoo",
      jobTitle: "Frontend Developer",
      description:
        "I'm a developer who values user experience. I love creating clean and intuitive interfaces, and I'm always passionate about learning new technologies.",
      skills: "Skills",
      contact: "Contact",
    },
    footer: {
      rights: "© 2025 Sol-namoo.blog",
    },
  },
};

// 빈 프로젝트 배열
export const projects: Project[] = [];

// 빈 블로그 포스트 배열 (실제로는 utils/blogUtils에서 로드됨)
export const blogPosts: BlogPost[] = [];

// 그라데이션 색상의 기술 스택 (옅은 오렌지부터 초록색까지)
export const skills: Skill[] = [
  { name: "JavaScript", color: "#FFB366" }, // 옅은 오렌지
  { name: "TypeScript", color: "#FF8C42" }, // 밝은 오렌지
  { name: "React", color: "#FF6B35" }, // 오렌지
  { name: "Next.js", color: "#FFA94D" }, // 연한 오렌지
  { name: "Jotai", color: "#FFB84D" }, // 노란색
  { name: "HTML", color: "#FFD93D" }, // 밝은 노란색
  { name: "CSS", color: "#FFE066" }, // 연한 노란색
  { name: "Tailwind", color: "#E6F3A3" }, // 연한 초록색
  { name: "MUI", color: "#4ADE80" }, // 초록색
];
