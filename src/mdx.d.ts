import type { ComponentType } from "react";

declare module "*.mdx" {
  export const meta: any;
  const MDXComponent: ComponentType<any>;
  export default MDXComponent;
}
