// 모든 블로그 포스트를 한 번에 import
import reflectionsPost from "./reflections-on-first-two-years.md?raw";
import monthlygrowPost from "./monthlygrow-devlog-part1.md?raw";

// 블로그 포스트들을 배열로 export
export const blogPosts = [
  { path: "reflections-on-first-two-years.md", content: reflectionsPost },
  { path: "monthlygrow-devlog-part1.md", content: monthlygrowPost },
];

// 개별 포스트도 export (필요한 경우)
export { reflectionsPost, monthlygrowPost };
