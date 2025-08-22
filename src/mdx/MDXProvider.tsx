// src/mdx/MDXProvider.tsx
import { MDXProvider as Provider } from "@mdx-js/react";
import React from "react";

/** 단일 이미지: width 지정 + 반응형  */
export function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { width = 400, style, ...rest } = props;
  return (
    <img
      {...rest}
      width={Number(width)}
      style={{
        height: "auto",
        display: "block",
        margin: "1rem auto",
        ...style,
      }}
    />
  );
}

/** 가로 정렬용 컨테이너 */
export function ImgRow({
  children,
  style,
  className,
  class: classProp,
  ...rest
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  class?: string;
}) {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        margin: "1rem 0",
        ...style,
      }}
      className={`img-row ${className || classProp || ""}`}
    >
      {children}
    </div>
  );
}

export default function MDXProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider
      components={{
        Img,
        ImgRow,
      }}
    >
      {children}
    </Provider>
  );
}
