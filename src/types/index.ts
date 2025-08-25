import type { ComponentType } from "react";

export interface BlogPost {
  id: string;
  emoji: string;
  title: {
    ko: string;
    en: string;
  };
  date: string; // ISO 8601 형식: "2025-01-04 00:00:00"
  updatedAt?: string;
  author: string;
  tags: string[]; // 예: ["career", "team", "leadership", "learning", "challenge"]
  category:
    | "retrospect"
    | "til"
    | "review"
    | "tutorial"
    | "thought"
    | "project"
    | "devlog";
  excerpt: {
    ko: string;
    en: string;
  };
  component?: ComponentType<any>; // Eager version
  loadComponent?: () => Promise<{ default: ComponentType<any> }>; // (Hybrid/Lazy에서 사용)
  slug?: string;
  path?: string;
  content?: string; // 마크다운 본문 (MDX 사용 시 선택사항)
}

export interface AchievementItem {
  summary: {
    ko: string;
    en: string;
  };
  content: {
    ko: string;
    en: string;
  };
}

export interface ProblemSolvingItem {
  title: {
    ko: string;
    en: string;
  };
  problem: {
    ko: string;
    en: string;
  };
  solution: {
    ko: string;
    en: string;
  };
  result: {
    ko: string;
    en: string;
  };
}

export interface SystemArchitecture {
  components: string[];
  description: string;
}

export interface Project {
  id: string;
  title: string;
  company?: string; // 회사명 (프로페셔널 프로젝트의 경우)
  role: string; // 역할 (예: "Frontend Developer", "Solo Developer")
  detailedRole?: { ko: string; en: string }; // 상세 역할 (My Role 섹션에서 사용)
  period: string; // 기간 (예: "Apr 2022 – Apr 2024")
  thumbnail: string; // 썸네일 (이모지 또는 이미지 URL)
  description: string; // 프로젝트 설명
  achievements: AchievementItem[]; // 주요 성과/업적 목록
  techStack: string[]; // 사용된 기술 스택
  category: "professional" | "personal"; // 프로젝트 카테고리
  featured?: boolean; // 주요 프로젝트 여부
  liveUrl?: string; // 라이브 사이트 링크 (선택사항)
  githubUrl?: string; // GitHub 링크 (선택사항)
  overview?: { ko: string; en: string }; // 프로젝트 개요 (선택사항)
  teamComposition?: { ko: string; en: string }; // 팀 구성 (선택사항)
  problemSolving?: ProblemSolvingItem[]; // 문제 해결 과정 (선택사항)
  systemArchitecture?: SystemArchitecture; // 시스템 아키텍처 (선택사항)
  nextSteps?: string[]; // 다음 단계 계획 (선택사항)
  whatILearned?: string[]; // 배운 점 (선택사항) - Personal projects only
  takeaway?: { ko: string; en: string }; // 한 줄 takeaway (Professional projects only)
}

export interface Skill {
  name: string;
  color: string; // CSS 색상 코드
}

export interface EducationItem {
  emoji: string;
  title: string;
  institution: string;
  period: string;
  location?: string;
  link?: string;
}

// 카테고리 타입 정의
export type BlogCategory =
  | "retrospect"
  | "til"
  | "review"
  | "tutorial"
  | "thought"
  | "project"
  | "devlog";

// 프로젝트 타입 정의
export type ProjectType = "work" | "side" | "personal";
export type TeamType = "individual" | "team";

// 태그 타입 정의 (블로그 글에서 사용되는 태그들)
export type BlogTag =
  | "career"
  | "team"
  | "leadership"
  | "learning"
  | "challenge"
  | "success"
  | "failure"
  | "frontend"
  | "backend"
  | "devops"
  | "react"
  | "typescript"
  | "javascript"
  | "nodejs"
  | "python"
  | "aws"
  | "docker"
  | "git"
  | "database"
  | "architecture"
  | "performance"
  | "security"
  | "conference"
  | "book"
  | "tool"
  | "method"
  | "personal"
  | "work"
  | "study";

export interface Texts {
  ko: {
    nav: {
      blog: string;
      portfolio: string;
      about: string;
    };
    blog: {
      title: string;
      categories: {
        all?: string;
        retrospect?: string;
        til?: string;
        review?: string;
        tutorial?: string;
        thought?: string;
        project?: string;
        devlog?: string;
      };
    };
    portfolio: {
      title: string;
    };
    about: {
      title: string;
      greeting: string;
      name: string;
      jobTitle: string;
      description: string;
      skills: string;
      education: string;
      contact: string;
    };
    footer: {
      rights: string;
    };
  };
  en: {
    nav: {
      blog: string;
      portfolio: string;
      about: string;
    };
    blog: {
      title: string;
      categories: {
        all: string;
        retrospect: string;
        til: string;
        review: string;
        tutorial: string;
        thought: string;
        project: string;
        devlog: string;
      };
    };
    portfolio: {
      title: string;
    };
    about: {
      title: string;
      greeting: string;
      name: string;
      jobTitle: string;
      description: string;
      skills: string;
      education: string;
      contact: string;
    };
    footer: {
      rights: string;
    };
  };
}
