import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Buffer } from "buffer";
import MDXProvider from "./mdx/MDXProvider";

// Buffer를 전역으로 설정
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MDXProvider>
      <App />
    </MDXProvider>
  </React.StrictMode>
);
