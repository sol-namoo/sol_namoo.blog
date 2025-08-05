// 태그 카테고리별 매핑
export const tagCategories = {
  tech: {
    name: { ko: "기술", en: "Technology" },
    tags: {
      react: { ko: "React", en: "React" },
      typescript: { ko: "TypeScript", en: "TypeScript" },
      nodejs: { ko: "Node.js", en: "Node.js" },
      python: { ko: "Python", en: "Python" },
      aws: { ko: "AWS", en: "AWS" },
      docker: { ko: "Docker", en: "Docker" },
      git: { ko: "Git", en: "Git" },
    },
  },
  topic: {
    name: { ko: "주제", en: "Topic" },
    tags: {
      frontend: { ko: "프론트엔드", en: "Frontend" },
      backend: { ko: "백엔드", en: "Backend" },
      devops: { ko: "DevOps", en: "DevOps" },
      database: { ko: "데이터베이스", en: "Database" },
      architecture: { ko: "아키텍처", en: "Architecture" },
      performance: { ko: "성능", en: "Performance" },
      security: { ko: "보안", en: "Security" },
    },
  },
  experience: {
    name: { ko: "경험", en: "Experience" },
    tags: {
      career: { ko: "커리어", en: "Career" },
      team: { ko: "팀워크", en: "Team" },
      leadership: { ko: "리더십", en: "Leadership" },
      learning: { ko: "학습", en: "Learning" },
      challenge: { ko: "도전", en: "Challenge" },
      success: { ko: "성공", en: "Success" },
      failure: { ko: "실패", en: "Failure" },
    },
  },
  other: {
    name: { ko: "기타", en: "Other" },
    tags: {
      conference: { ko: "컨퍼런스", en: "Conference" },
      book: { ko: "책", en: "Book" },
      tool: { ko: "도구", en: "Tool" },
      method: { ko: "방법론", en: "Method" },
      personal: { ko: "개인", en: "Personal" },
      work: { ko: "업무", en: "Work" },
      study: { ko: "공부", en: "Study" },
      ai: { ko: "AI", en: "AI" },
      mvp: { ko: "MVP", en: "MVP" },
      firebase: { ko: "Firebase", en: "Firebase" },
    },
  },
};

// 카테고리 매핑
export const categoryMapping = {
  retrospect: { ko: "회고", en: "Retrospect" },
  til: { ko: "TIL", en: "TIL" },
  review: { ko: "리뷰", en: "Review" },
  tutorial: { ko: "튜토리얼", en: "Tutorial" },
  thought: { ko: "생각", en: "Thought" },
  project: { ko: "프로젝트", en: "Project" },
};

// 기존 함수 유지 (하위 호환성)
export const getLocalizedTag = (tag: string, lang: string): string => {
  // 모든 카테고리에서 태그 찾기
  for (const category of Object.values(tagCategories)) {
    if (category.tags && tag in category.tags) {
      const tagData = category.tags[tag as keyof typeof category.tags];
      if (tagData && lang in tagData) {
        return tagData[lang as keyof typeof tagData];
      }
    }
  }

  // 찾지 못하면 원본 반환
  return tag;
};

// 카테고리별 태그 가져오기
export const getTagsByCategory = (category: string) => {
  return tagCategories[category as keyof typeof tagCategories]?.tags || {};
};

// 모든 태그 가져오기
export const getAllTags = () => {
  const allTags: Record<string, { ko: string; en: string }> = {};

  Object.values(tagCategories).forEach((category) => {
    Object.assign(allTags, category.tags);
  });

  return allTags;
};
