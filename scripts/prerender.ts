// scripts/prerender.ts
// 동적 라우트 생성 + prerender 스크립트

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 동적으로 라우트 생성 (MDX 파일을 직접 스캔)
async function generateRoutes() {
  try {
    // 기본 라우트들
    const baseRoutes = ["/", "/blog", "/portfolio", "/about"];

    // 블로그 포스트 디렉토리에서 MDX 파일들 스캔
    const blogDir = path.join(__dirname, "../src/content/blog");
    const mdxFiles = fs
      .readdirSync(blogDir)
      .filter((file) => file.endsWith(".mdx"));

    // MDX 파일명에서 라우트 생성
    const blogRoutes = mdxFiles.map((file) => {
      const fileName = file.replace(".mdx", "");
      return `/blog/${fileName}`;
    });

    // 모든 라우트 합치기
    const allRoutes = [...baseRoutes, ...blogRoutes];

    console.log("📋 Generated routes:", allRoutes);
    return allRoutes;
  } catch (error) {
    console.error("❌ Error generating routes:", error);
    // 에러 시 기본 라우트만 반환
    return ["/", "/blog", "/portfolio", "/about"];
  }
}

async function prerender() {
  console.log("🚀 Starting prerender process...");

  // 동적으로 라우트 생성
  const routes = await generateRoutes();

  const distPath = path.join(__dirname, "../dist");
  const templatePath = path.join(distPath, "index.html");

  // dist/index.html이 존재하는지 확인
  if (!fs.existsSync(templatePath)) {
    console.error(
      '❌ dist/index.html not found. Please run "npm run build" first.'
    );
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf-8");

  // 각 라우트에 대해 HTML 파일 생성
  for (const route of routes) {
    try {
      // 라우트별 HTML 파일 경로 생성
      const fileName = route === "/" ? "index.html" : `${route}/index.html`;
      const filePath = path.join(distPath, fileName);

      // 디렉토리 생성
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // HTML 파일 생성 (현재는 템플릿을 그대로 복사)
      // 실제로는 각 라우트의 콘텐츠를 렌더링해야 함
      fs.writeFileSync(filePath, template, "utf-8");

      console.log(`✅ Generated: ${fileName}`);
    } catch (error) {
      console.error(`❌ Error generating ${route}:`, error.message);
    }
  }

  console.log("🎉 Prerender completed!");
}

prerender().catch(console.error);
