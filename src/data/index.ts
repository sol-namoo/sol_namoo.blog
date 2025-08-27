import {
  Project,
  Skill,
  Texts,
  BlogPost,
  BlogCategory,
  EducationItem,
} from "../types";

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
        devlog: "개발기",
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
      education: "학력 & 자격증",
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
        devlog: "Devlog",
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
      education: "Education & Certifications",
      contact: "Contact",
    },
    footer: {
      rights: "© 2025 Sol-namoo.blog",
    },
  },
};

// 프로젝트 데이터
export const projects = {
  professional: [
    {
      id: "focusmedia-platform",
      title: "Advertisement Scheduling & Broadcasting Platform",
      company: "FocusMedia Korea",
      role: "Frontend Developer",
      detailedRole: {
        ko: "미디어 파일 업로드 및 관리, 스케줄링 UI, 검증 아키텍처 담당",
        en: "Owned media file upload & management, scheduling UI, and validation architecture",
      },
      period: "Dec 2022 – Apr 2025",
      thumbnail: "/images/portfolio/Thumbnail_fomigo.webp",
      description:
        "Campaign editor, schedule validator, and region-based media planner with SSR migration for improved performance.",
      achievements: [
        {
          summary: {
            ko: "LCP 40% 개선",
            en: "Reduced LCP from 2.07s → 1.24s (40% faster initial load)",
          },
          content: {
            ko: "분리된 클라이언트 islands + dynamic() 지연 로딩으로 초기 JS·하이드레이션 범위를 축소해 LCP 40% 개선",
            en: "Reduced initial JS and hydration scope via client islands + dynamic() lazy loading; improved LCP by 40%",
          },
        },
        {
          summary: {
            ko: "사내 워크플로우 효율 4배 향상",
            en: "Improved internal workflow efficiency by 4x",
          },
          content: {
            ko: "기존 외주 CMS와 내·외부 6개 툴을 통합해 워크플로우 처리량 4배 향상(핸드오프/중복 입력 제거)",
            en: "Consolidated a legacy CMS and ~6 internal/external tools, yielding 4× higher workflow throughput (eliminated hand-offs/duplicate entry)",
          },
        },
        {
          summary: {
            ko: "QA 에러 티켓 25% 감소",
            en: "Reduced QA error tickets by approximately 25%",
          },
          content: {
            ko: "Yup 스키마 모듈화와 공용 검증 규약으로 QA 에러 티켓 약 25% 감소",
            en: "Modular Yup schemas and shared validation conventions cut QA error tickets by ~25%",
          },
        },
        {
          summary: {
            ko: "Next.js 14 SSR 마이그레이션",
            en: "Migrated to SSR with Next.js 14",
          },
          content: {
            ko: "Next.js 하이브리드(RSC + SSR/ISR) 도입: 공개 페이지는 정적/재생성으로 속도 개선, 콘솔은 SSR 셸 + CSR 데이터 패턴으로 유지보수성·보안 경계 강화",
            en: "Adopted Next.js hybrid (RSC + SSR/ISR): static/regenerated public pages for SEO & speed; console uses an SSR shell + CSR data pattern to strengthen maintainability and security boundaries",
          },
        },
      ],
      techStack: [
        "React 18",
        "Next.js 14",
        "TypeScript",
        "Yup",
        "Jotai",
        "Styled-components",
        "MUI",
        "AWS Lambda",
      ],
      category: "professional",
      featured: true,
      problemSolving: [
        {
          title: {
            ko: "복잡한 페이지의 초기 체감 속도",
            en: "Slow initial perception on a complex page",
          },
          problem: {
            ko: "다층 스케줄 폼·3개 모달·검증 로직으로 초기 번들/하이드레이션 과다 → LCP 지연",
            en: "Multi-layer schedule form, 3 modal pickers, and heavy validation inflated the initial bundle/hydration → high LCP",
          },
          solution: {
            ko: "모달을 클라이언트 islands로 분리해 dynamic() 지연 로드, 셸(헤더/네비/스켈레톤)은 서버에서 프리렌더",
            en: "Split modals into client islands and dynamic() lazy-load; pre-rendered the shell (header/nav/skeleton) on the server",
          },
          result: {
            ko: "LCP 40% 개선 (2.07초 → 1.24초).",
            en: "40% LCP improvement (2.07s → 1.24s).",
          },
        },
        {
          title: {
            ko: "하이드레이션/리렌더 병목",
            en: "Hydration & re-render bottlenecks",
          },
          problem: {
            ko: "입력 변경마다 폼 전체 리렌더 → TTI/TBT 지연·입력 지연 체감",
            en: "Whole-form re-renders on input changes → TTI/TBT degradation and sluggish typing",
          },
          solution: {
            ko: "React Hook Form(uncontrolled) + Yup로 검증 위임, React.memo/useCallback으로 리렌더 격리, 대형 리스트 가상화",
            en: "Moved to React Hook Form (uncontrolled) with Yup; isolated re-renders using React.memo/useCallback; virtualized large lists",
          },
          result: {
            ko: "TTI 체감 개선, 상호작용 응답성 향상",
            en: "Faster TTI feel and smoother interactions",
          },
        },
        {
          title: {
            ko: "실시간 작업 모니터링",
            en: "Real-time task monitoring",
          },
          problem: {
            ko: "트랜스코딩은 목록에서 미완료 항목만 추적, IoT는 완료 시점 불확실(최대 15분)",
            en: "Transcoding needed list-level tracking of unfinished items; IoT completion was unpredictable (up to 15 min)",
          },
          solution: {
            ko: "SSE/WebSocket 검토 후, 인프라/안정성 고려해 미완료만 선택 폴링(지수 백오프); IoT는 진입 시 단발성 조회",
            en: "Evaluated SSE/WebSocket; chose selective per-item polling with exponential backoff for the list, and one-off fetches for IoT on entry",
          },
          result: {
            ko: "오버헤드 최소화와 목록의 즉시 반영 달성",
            en: "Minimal overhead with immediate list updates",
          },
        },
      ],
      overview: {
        ko: "한국 최대 엘리베이터 미디어 네트워크(9,000+ 스크린)를 서비스하는 종합 광고 스케줄링 및 방송 플랫폼을 개발했습니다.\n프론트엔드 엔지니어로서 React 16에서 Next.js 14로의 마이그레이션을 주도하고, 재사용 가능한 검증 시스템을 구축하며, 컴포넌트가 많은 페이지의 성능을 최적화했습니다.\n분산된 내부 및 외부 시스템을 하나의 플랫폼으로 통합하여 워크플로우 효율성을 4배, 광고 슬롯 가치를 2.9배 향상시켰습니다.",
        en: "Developed a comprehensive advertisement scheduling and broadcasting platform serving the largest elevator media network in Korea (9,000+ screens).\nAs the frontend engineer, I led the migration from React 16 to Next.js 14, built reusable validation systems, and optimised performance for component-heavy pages.\nUnified fragmented internal & external systems into one platform, boosting workflow efficiency by 4x and ad slot value by 2.9x.",
      },
      teamComposition: {
        ko: "FE 3명, BE 3명, 안드로이드 1명, 디자이너 3명",
        en: "FE 3, BE 2, Android 1, Designer 3",
      },
      systemArchitecture: {
        components: [
          "Client (React/Next.js)",
          "Backend API",
          "AWS Lambda Functions",
        ],
        description:
          "Client (React/Next.js) → Backend API → AWS Lambda Functions",
      },
      nextSteps: [
        "Strengthen automated test coverage for future scalability",
        "Explore alternative state management beyond Context API for deeply nested data",
      ],
      takeaway: {
        ko: "모듈화된 검증과 하이브리드 렌더링 전략이 확장 가능한 엔터프라이즈급 플랫폼 구축에 중요하다는 것을 배웠습니다.",
        en: "Learned the importance of modular validation and hybrid rendering strategies for building scalable enterprise-grade platforms.",
      },
    },
    {
      id: "advertiser-homepage",
      title: "Advertiser Homepage",
      company: "FocusMedia Korea",
      role: "Frontend Developer",
      detailedRole: {
        ko: "About 페이지, FAQ, SAP 문의 폼, CTA 컴포넌트 담당",
        en: "Owned About page, FAQ, SAP inquiry forms, CTA components",
      },
      period: "Oct 2023 – Feb 2024",
      thumbnail: "/images/portfolio/Thumbnail_Homepage.webp",
      description:
        "Responsive landing pages with advanced animations and customer journey tracking.",
      achievements: [
        {
          summary: {
            ko: "리드 전환율 20% 향상",
            en: "Improved lead conversion rate by 20%",
          },
          content: {
            ko: "GTM/GA 트래킹 시스템 구축과 사용자 여정 최적화를 통해 리드 전환율을 20% 향상시켰습니다.",
            en: "Improved lead conversion rate by 20% through GTM/GA tracking system implementation and user journey optimization.",
          },
        },
        {
          summary: {
            ko: "GSAP SVG 애니메이션 구축",
            en: "Built SVG animations with GSAP",
          },
          content: {
            ko: "GSAP를 활용한 고성능 애니메이션으로 사용자 참여도를 높이고 브랜드 인지도를 향상시켰습니다.",
            en: "Built high-performance animations with GSAP to increase user engagement and improve brand recognition.",
          },
        },
        {
          summary: {
            ko: "GTM/GA 트래킹 시스템 통합",
            en: "Integrated GTM/GA tracking",
          },
          content: {
            ko: "전체 사용자 여정을 추적할 수 있는 분석 시스템을 구축하여 데이터 기반 의사결정을 지원했습니다.",
            en: "Built an analytics system that tracks the entire user journey and supports data-driven decision making.",
          },
        },
        {
          summary: {
            ko: "SAP 연동 폼 시스템 모듈화",
            en: "Consolidated multiple SAP-integrated inquiry forms into a modular React form system",
          },
          content: {
            ko: "여러 SAP 연동 문의 폼을 모듈형 React 폼 시스템으로 통합하여 유지보수성을 개선하고 비즈니스 규칙 변경 시 업데이트 작업을 줄였습니다.",
            en: "Consolidated multiple SAP-integrated inquiry forms into a modular React form system, improving maintainability and reducing update effort when business rules changed.",
          },
        },
      ],
      techStack: ["React 18", "Next.js", "GSAP", "Module CSS", "Vercel"],
      liveUrl: "https://www.focusmediakorea.com/",
      category: "professional",
      featured: true,
      problemSolving: [
        {
          title: {
            ko: "레거시 마이그레이션",
            en: "Legacy migration",
          },
          problem: {
            ko: "기존 사이트는 PHP + 정적 HTML 기반으로 유지보수가 어렵고 SEO/UX 확장성에 한계가 있었습니다.",
            en: "Existing site was built with static PHP + HTML, which was hard to maintain and limited in SEO/UX scalability.",
          },
          solution: {
            ko: "Next.js 기반으로 신규 구축하여 모듈형 폼 구조 및 반응형 레이아웃을 구현했습니다.",
            en: "Built from scratch with Next.js, implementing modular form structure and responsive layout.",
          },
          result: {
            ko: "SEO 성능을 유지하면서 20%의 UX 개선을 달성했습니다.",
            en: "Preserved SEO performance while improving perceived UX by 20% through smoother navigation and faster interactivity.",
          },
        },
        {
          title: {
            ko: "비디오 퍼포먼스",
            en: "Video performance",
          },
          problem: {
            ko: "Hover 기반 영상 배너의 로딩이 느려 사용자 참여도가 떨어졌습니다.",
            en: "Hover-triggered video banners suffered from slow load times, causing poor engagement.",
          },
          solution: {
            ko: "자주 노출되는 영상 에셋을 preload 처리했습니다.",
            en: "Implemented preload strategies for frequently triggered video assets.",
          },
          result: {
            ko: "영상 재생 반응성을 개선하여 사용자 참여도와 브랜드 인지도를 높였습니다.",
            en: "Improved responsiveness of video playback, increasing user interaction and brand impression.",
          },
        },
        {
          title: {
            ko: "사용자 여정 추적",
            en: "User journey tracking",
          },
          problem: {
            ko: "광고주 행동과 캠페인 문의를 추적할 수 있는 중앙 분석 시스템이 없었습니다.",
            en: "No central analytics existed for monitoring advertiser behavior and campaign inquiries.",
          },
          solution: {
            ko: "GTM/GA를 전체 페이지에 통합하여 사용자 여정 데이터를 수집했습니다.",
            en: "Integrated GTM/GA across the entire site to capture customer journey data.",
          },
          result: {
            ko: "데이터 기반 의사결정이 가능해졌고 광고 문의 전환율이 20% 상승했습니다.",
            en: "Enabled data-driven decision making and contributed to a 20% uplift in advertiser inquiries.",
          },
        },
        {
          title: {
            ko: "분산된 SAP 문의 폼",
            en: "Fragmented SAP inquiry forms",
          },
          problem: {
            ko: "SAP문의 폼이 개별 HTML 시트로 관리되어 중복 작업을 만들고 업데이트를 느리게 했습니다.",
            en: "Multiple PHP/HTML forms tied to separate SAP sheets created duplicated work and slowed updates.",
          },
          solution: {
            ko: "폼을 중앙화된 검증과 재사용 가능한 섹션을 가진 조합 가능한 React 모듈 시스템으로 재구축했습니다.",
            en: "Rebuilt forms into a composable React module system with centralised validation and reusable sections.",
          },
          result: {
            ko: "유지보수를 단순화하고 개발자 생산성을 향상시켜 비즈니스 변화에 더 빠르게 적응할 수 있게 했습니다.",
            en: "Simplified maintenance, improved developer productivity, and enabled faster adaptation to business changes.",
          },
        },
      ],
      overview: {
        ko: "광고주 전용 홈페이지를 기존 PHP 기반에서 Next.js 구조와 GSAP 인터랙션으로 재구축했습니다.\nGTM/GA 통합과 문의 플로우 최적화를 통해 광고주 문의 전환율을 20% 향상(1.2배 증가)시켰습니다.\n비디오 프리로딩과 고성능 애니메이션으로 사용자 체감 성능과 브랜드 인지도를 높였으며, 이를 통해 세일즈 파이프라인 강화를 지원하고 신규 광고주 확보에 기여했습니다.",
        en: "Rebuilt the advertiser-facing homepage with a responsive Next.js architecture and interactive GSAP animations, replacing a static PHP system.\nEnhanced user journey tracking with GTM/GA and optimised inquiry flow, resulting in a 20% uplift in advertiser conversions (1.2x increase).\nImproved perceived engagement and brand recognition through high-performance video preload strategies, supporting FocusMedia's sales pipeline and strengthening client acquisition.",
      },
      teamComposition: {
        ko: "FE 2명, BE 1명, 디자이너 3명",
        en: "FE 2, BE 1, Designer 3",
      },
      systemArchitecture: {
        components: ["Frontend (React)", "Backend API"],
        description: "Static Generation with Dynamic Components",
      },
      takeaway: {
        ko: "모듈형 React 폼이 SAP 연동 엔터프라이즈 워크플로우에서 유지보수성과 개발자 경험을 개선할 수 있다는 것을 배웠습니다.",
        en: "Learned how modular React forms can improve maintainability and DX in SAP-integrated enterprise workflows.",
      },
    },
    // {
    //   id: "admin-dashboard",
    //   title: "Admin Dashboard",
    //   company: "FocusMedia Korea",
    //   role: "Frontend Developer",
    //   period: "Jan 2024 – Mar 2024",
    //   thumbnail: "📊",
    //   description:
    //     "Internal admin dashboard for campaign management and analytics with real-time data visualization.",
    //   achievements: [
    //     {
    //       achievement: "Real-time data updates with WebSocket",
    //       description:
    //         "WebSocket을 활용한 실시간 데이터 업데이트로 관리자가 즉시 최신 정보를 확인할 수 있도록 구현했습니다.",
    //     },
    //     {
    //       achievement: "Interactive charts with Chart.js",
    //       description:
    //         "Chart.js를 활용한 인터랙티브 차트로 복잡한 데이터를 직관적으로 시각화했습니다.",
    //     },
    //     {
    //       achievement: "Role-based access control implementation",
    //       description:
    //         "역할 기반 접근 제어 시스템을 구현하여 보안을 강화하고 사용자 권한을 체계적으로 관리했습니다.",
    //     },
    //   ],
    //   techStack: ["React", "TypeScript", "Chart.js", "WebSocket", "JWT"],
    //   liveUrl: "#",
    //   category: "professional",
    //   featured: false,
    //   systemArchitecture: {
    //     components: ["Frontend (React)", "Backend API", "WebSocket"],
    //     description: "Real-time Dashboard with WebSocket Integration",
    //   },
    // },
  ],
  personal: [
    {
      id: "monthly-grow",
      title: "MonthlyGrow",
      role: "Solo Developer",
      detailedRole: {
        ko: "풀스택 개발, UI/UX 디자인, 제품 관리",
        en: "Full-stack development, UI/UX design, and product management",
      },
      period: "Apr 2025 – Aug 2025",
      thumbnail: "/images/portfolio/monthlyGrow-thumb.webp",
      description:
        "Self-improvement app for structured goal tracking using PARA methodology and AI prompts.",
      achievements: [
        {
          summary: {
            ko: "AI 기반 습관 제안 시스템",
            en: "AI-powered habit suggestions",
          },
          content: {
            ko: "Claude LLM과 GPT-4 API를 통합하여 개인화된 목표 추천 시스템을 구현했습니다.",
            en: "Implemented personalized goal recommendation system through integration of Claude LLM and GPT-4 API.",
          },
        },
        {
          summary: {
            ko: "자동화된 루프 스냅샷",
            en: "Automated loop snapshots",
          },
          content: {
            ko: "Firebase Pub/Sub 크론잡을 이용해 매월 1일 스냅샷을 자동 생성하고 미완료 프로젝트를 자동 이월하는 로직을 구현했습니다.",
            en: "Used Firebase Pub/Sub cron jobs to generate monthly snapshots and automatically carry over unfinished projects.",
          },
        },
        {
          summary: {
            ko: "NoSQL 스키마 설계 개선",
            en: "Improved NoSQL schema design",
          },
          content: {
            ko: "Loop–Project–Task 관계를 PARA 구조에 맞춰 재설계하여 유지보수성과 확장성을 확보했습니다.",
            en: "Redesigned Loop–Project–Task relationships aligned with the PARA framework for better maintainability and scalability.",
          },
        },
      ],
      techStack: [
        "React",
        "Tailwind CSS",
        "Firebase (Firestore, Auth, Pub/Sub)",
        "Claude LLM",
        "GPT-4 API",
      ],
      liveUrl: "https://monthly-grow.vercel.app/",
      githubUrl: "https://github.com/sol-namoo/monthlyGrow",
      category: "personal",
      featured: true,
      problemSolving: [
        {
          title: {
            ko: "전체 개발 사이클 경험",
            en: "Full development cycle",
          },
          problem: {
            ko: "기획부터 UI, 개발, 데이터 입력, 배포까지 혼자 수행해야 하는 복잡한 워크플로우",
            en: "Had to handle the entire workflow alone, from planning and UI to development, data setup, and deployment.",
          },
          solution: {
            ko: "체크리스트 기반으로 기획 → UI 프로토타입 → 구현 → 데이터 연동 → 배포까지 8단계 이상을 순차적으로 관리",
            en: "Created a checklist to sequentially manage over 8 stages: planning → UI prototyping → implementation → data integration → deployment.",
          },
          result: {
            ko: "실무 수준의 end-to-end 개발 사이클을 혼자 경험하며 자기 주도적 문제 해결 능력 강화",
            en: "Gained end-to-end product development experience and strengthened self-directed problem solving skills.",
          },
        },
        {
          title: {
            ko: "복잡한 데이터 구조와 비용 이슈",
            en: "Complex data modeling and cost issues",
          },
          problem: {
            ko: "연간 대시보드 조회에 필요한 데이터 간 관계가 복잡, 조회 시 실시간 집계를 수행하면 데이터 계산 비용과 응답 지연이 발생",
            en: "Yearly dashboard queries required complex data relationships, and on-demand aggregation risked high monthly computation cost and slow response times",
          },
          solution: {
            ko: "스키마를 리팩토링하고 크론 기반 스냅샷 설계를 도입해 매월 자동화된 데이터 생성과 carry-over를 구현",
            en: "Refactored schema and introduced cron-based snapshot design to automate monthly data creation and carry-over",
          },
          result: {
            ko: "조회 시 실시간 집계가 필요 없어져 비용을 절감하고 빠른 대시보드 UX를 확보",
            en: "Removed on-demand aggregation, reducing cost and achieving fast dashboard UX",
          },
        },
        {
          title: {
            ko: "AI 프롬프팅 및 UX 가이드",
            en: "AI prompting & UX guidance",
          },
          problem: {
            ko: "Claude API 사용 상황에서 앱 목적에 맞는 일관된 답변 필요",
            en: "Claude API use required consistent and relevant outputs for the app’s purpose",
          },
          solution: {
            ko: "UI 폼에서 필수 값 입력을 가이드하고, 앱 구조에 맞는 프롬프트 템플릿 설계 및 예시 지시 추가",
            en: "Guided input of required fields via UI forms, designed prompt templates, and added examples to stabilise outputs",
          },
          result: {
            ko: "응답 관련성과 실행 가능성을 높여 안정적인 AI 응답 흐름을 확보했습니다",
            en: "Improved response relevance and actionability, enabling stable AI interaction flow",
          },
        },
      ],
      overview: {
        ko: "PARA 방법론을 기반으로 한 목표 관리와 회고 시스템을 AI와 결합하여 만든 자기계발 애플리케이션입니다. 모든 개발 사이클을 혼자 경험하며, 복잡한 데이터 구조 문제와 비용/UX 트레이드오프를 해결했습니다.",
        en: "AI-powered self-improvement app combining PARA-based goal tracking with automated reflection. Built end-to-end as a solo developer, addressing complex data modeling and balancing cost with UX through automation.",
      },
      teamComposition: {
        ko: "개인 프로젝트",
        en: "Solo Project",
      },
      systemArchitecture: {
        components: [
          "Frontend (React)",
          "Firebase (Firestore, Auth, Pub/Sub)",
          "AI APIs (Claude, GPT-4)",
        ],
        description:
          "Automated monthly snapshots with PARA-based schema and AI integration",
      },
      whatILearned: [
        "전체 개발 사이클을 혼자 경험하며 자기 주도적 문제 해결 능력 강화",
        "복잡한 데이터 구조에서 비용과 성능의 트레이드오프 해결 방법",
        "AI API 통합 시 일관된 응답을 위한 프롬프트 엔지니어링",
        "Firebase Pub/Sub을 활용한 자동화된 데이터 처리 시스템",
        "PARA 방법론을 기반으로 한 사용자 중심의 UX 설계",
      ],
      nextSteps: [
        "모바일 앱 버전 개발 및 PWA 기능 추가",
        "AI 응답 품질 개선을 위한 프롬프트 최적화",
        "사용자 피드백 시스템 및 분석 대시보드 구축",
        "팀 협업 기능 및 공유 기능 추가",
        "다국어 지원 및 글로벌 사용자 확장",
      ],
    },
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      role: "Solo Developer",
      detailedRole: {
        ko: "프론트엔드 개발, 반응형 디자인, 콘텐츠 관리",
        en: "Frontend development, responsive design, and content management",
      },
      period: "Jul 2025 – Aug 2025",
      thumbnail: "📝",
      description:
        "Personal portfolio website built with React and Vite, featuring dark mode and responsive design.",
      achievements: [
        {
          summary: {
            ko: "모바일 우선 반응형 디자인",
            en: "Responsive design with mobile-first approach",
          },
          content: {
            ko: "모바일 우선 접근법으로 반응형 디자인을 구현하여 모든 디바이스에서 최적의 사용자 경험을 제공합니다.",
            en: "Implemented responsive design with mobile-first approach to provide optimal user experience across all devices.",
          },
        },
        {
          summary: {
            ko: "MDX 기반 블로그 시스템",
            en: "MDX-based blog system",
          },
          content: {
            ko: "MDX를 활용한 마크다운 기반 블로그 시스템을 구축하여 기술 글 작성과 콘텐츠 관리를 효율화했습니다.",
            en: "Built an MDX-based blog system for efficient technical writing and content management.",
          },
        },
        {
          summary: {
            ko: "코드 분할을 통한 성능 최적화",
            en: "Optimized performance through code splitting",
          },
          content: {
            ko: "코드 분할을 통한 성능 최적화로 초기 로딩 속도를 개선하고 사용자 경험을 향상시켰습니다.",
            en: "Optimized performance through code splitting to improve initial loading speed and enhance user experience.",
          },
        },
        {
          summary: {
            ko: "다국어 지원 시스템",
            en: "Multi-language support system",
          },
          content: {
            ko: "한국어/영어 다국어 지원 시스템을 구현하여 글로벌 접근성을 향상시켰습니다.",
            en: "Implemented Korean/English multi-language support system to enhance global accessibility.",
          },
        },
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/sol-namoo/sol_namoo.blog",
      category: "personal",
      featured: false,
      overview: {
        ko: "React와 Vite로 구축된 개인 포트폴리오 웹사이트입니다. 다크/라이트 모드 토글, MDX 기반 블로그 시스템, 다국어 지원을 특징으로 하며, 코드 분할을 통한 성능 최적화를 구현했습니다.",
        en: "Personal portfolio website built with React and Vite, featuring dark/light mode toggle, MDX-based blog system, and multi-language support. Implemented performance optimization through code splitting.",
      },
      teamComposition: {
        ko: "개인 프로젝트",
        en: "Solo Project",
      },
      systemArchitecture: {
        components: ["Frontend (React + Vite)", "MDX Content", "Static Build"],
        description: "Static Site with Dynamic Features and MDX Blog",
      },
      whatILearned: [
        "Vite의 빠른 개발 환경과 빌드 성능의 중요성",
        "MDX를 활용한 기술 블로그 구축과 콘텐츠 관리 전략",
        "다국어 지원 시스템 설계와 사용자 경험 최적화",
        "다크/라이트 모드 구현을 통한 접근성과 사용자 선호도 고려",
        "정적 사이트에서 동적 기능을 구현하는 하이브리드 접근법",
      ],
      nextSteps: [
        "SEO 최적화 및 검색 엔진 가시성 향상",
        "블로그 댓글 시스템 및 소셜 기능 추가",
        "성능 모니터링 및 분석 도구 통합",
        "PWA 기능 추가로 모바일 앱 경험 제공",
        "콘텐츠 관리 시스템(CMS) 도입 고려",
      ],
    },
  ],
};

// 빈 블로그 포스트 배열 (실제로는 utils/blogUtils에서 로드됨)
export const blogPosts: BlogPost[] = [];

// 카테고리 맵핑 헬퍼 함수
export const getCategoryLabel = (
  category: BlogCategory,
  lang: "ko" | "en"
): string => {
  return texts[lang].blog.categories[category] || category;
};

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

// Education & Certifications 데이터
export const educationKo: EducationItem[] = [
  {
    emoji: "🎓",
    title: "컴퓨터과학 학사과정",
    institution: "한국방송통신대학교",
    period: "Mar 2025 – Nov 2026\n(재학)",
    location: "원격 (대한민국)",
  },
  {
    emoji: "📜",
    title: "정보처리기사",
    institution: "HRD Korea",
    period: "Aug 2024",
  },
  {
    emoji: "📜",
    title: "AWS Certified Developer – Associate",
    institution: "Amazon Web Services",
    period: "Dec 2023",
    link: "https://www.credly.com/badges/47bca130-02c5-414d-8bbc-8af8615eb5bd/linked_in_profile",
  },
  {
    emoji: "📜",
    title: "Frontend Bootcamp",
    institution: "Code States",
    period: "Apr 2022 - Nov 2022",
  },
  {
    emoji: "🎓",
    title: "예술사 예술경영 전공",
    institution: "한국예술종합학교",
    period: "Mar 2015 - Jul 2020",
  },
];

export const educationEn: EducationItem[] = [
  {
    emoji: "🎓",
    title: "B.Sc. in Computer Science",
    institution: "Korea National Open University",
    period: "Mar 2025 – Nov 2026\n(in progress)",
    location: "Remote (South Korea)",
  },
  {
    emoji: "📜",
    title: "Engineer Information Processing",
    institution: "HRD Korea",
    period: "Aug 2024",
  },
  {
    emoji: "📜",
    title: "AWS Certified Developer – Associate",
    institution: "Amazon Web Services",
    period: "Dec 2023",
    link: "https://www.credly.com/badges/47bca130-02c5-414d-8bbc-8af8615eb5bd/linked_in_profile",
  },
  {
    emoji: "📜",
    title: "Frontend Bootcamp",
    institution: "Code States",
    period: "Apr 2022 - Nov 2022",
  },
  {
    emoji: "🎓",
    title: "B.A. in Arts Management",
    institution: "Korea National University of Arts",
    period: "Mar 2015 - Jul 2020",
  },
];
