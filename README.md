# Sol-namoo.blog 포트폴리오

Lee Sol의 개발자 포트폴리오 웹사이트입니다.

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- MDX (블로그 콘텐츠)
- Lucide React (아이콘)

## 기능

- 🌙 다크/라이트 모드 토글
- 🌍 한국어/영어 언어 전환
- 📱 반응형 디자인
- 📝 MDX 기반 블로그 포스트
- 💼 프로젝트 포트폴리오
- 👤 개발자 소개

## 설치 및 실행

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

### 빌드 미리보기

```bash
npm run preview
```

## 블로그 포스트 작성

이 프로젝트는 MDX를 사용하여 블로그 포스트를 작성합니다. 새로운 포스트를 추가하려면:

### 1. MDX 파일 생성

`src/content/blog/` 디렉토리에 새로운 `.mdx` 파일을 생성합니다.

### 2. Frontmatter 작성

파일 상단에 frontmatter를 작성하고 `export const meta`로 노출합니다:

```mdx
---
id: "post-slug"
emoji: "📝"
title_ko: "한국어 제목"
title_en: "English Title"
date: "2025-01-15 00:00:00"
author: "Sol Lee"
tags: ["tag1", "tag2"]
category: "tutorial"
excerpt_ko: "한국어 요약"
excerpt_en: "English excerpt"
---

export const meta = {
  id,
  emoji,
  title_ko,
  title_en,
  date,
  author,
  tags,
  category,
  excerpt_ko,
  excerpt_en,
};

# 블로그 포스트 내용

마크다운과 React 컴포넌트를 모두 사용할 수 있습니다!

<img src="/path/to/image.jpg" alt="이미지 설명" />
```

### 3. 이미지 사용

MDX에서는 다음과 같은 방법으로 이미지를 사용할 수 있습니다:

- **일반 마크다운**: `![alt text](/path/to/image.jpg)`
- **React 컴포넌트**: `<img src="/path/to/image.jpg" alt="alt text" />`

### 4. 카테고리

사용 가능한 카테고리:

- `retrospect`: 회고
- `til`: 오늘 배운 것
- `review`: 리뷰
- `tutorial`: 튜토리얼
- `thought`: 생각
- `project`: 프로젝트

## 프로젝트 구조

```
sol-namoo-dev/
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── BlogPage.tsx        # 블로그 목록 페이지
│   │   │   └── BlogPostPage.tsx    # 블로그 포스트 페이지
│   │   └── SolDevPortfolio.tsx     # 메인 포트폴리오 컴포넌트
│   ├── content/
│   │   └── blog/
│   │       ├── index.ts            # 블로그 포스트 로딩 로직
│   │       └── *.mdx               # MDX 블로그 포스트들
│   ├── utils/
│   │   └── blogUtils.ts            # 블로그 유틸리티 함수
│   ├── App.tsx                     # 앱 진입점
│   ├── main.tsx                    # React 렌더링
│   └── index.css                   # 전역 스타일
├── public/                         # 정적 파일
├── index.html                      # HTML 템플릿
├── vite.config.ts                  # Vite 설정
├── tailwind.config.js              # Tailwind CSS 설정
└── package.json                    # 프로젝트 의존성
```

## 개발 환경

- Node.js 18+
- npm 9+

## 라이선스

ISC
