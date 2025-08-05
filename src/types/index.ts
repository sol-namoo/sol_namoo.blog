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
    | "project";
  excerpt: {
    ko: string;
    en: string;
  };
  content: string; // 마크다운 본문
}

export interface Project {
  id: string;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  tech: string[]; // 사용된 기술 스택
  image: string; // 프로젝트 이미지 URL
  github?: string; // GitHub 링크 (선택사항)
  demo?: string; // 데모 링크 (선택사항)
  type: "work" | "side" | "personal"; // 프로젝트 유형
  team: "individual" | "team"; // 팀/개인 작업
  year: number; // 프로젝트 완료 연도
  featured?: boolean; // 주요 프로젝트 여부
}

export interface Skill {
  name: string;
  color: string; // CSS 색상 코드
}

// 카테고리 타입 정의
export type BlogCategory =
  | "retrospect"
  | "til"
  | "review"
  | "tutorial"
  | "thought"
  | "project";

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
      contact: string;
    };
    footer: {
      rights: string;
    };
  };
}
