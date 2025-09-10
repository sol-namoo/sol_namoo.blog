import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Buffer } from "buffer";
import MDXProvider from "./mdx/MDXProvider";
import { HelmetProvider } from "react-helmet-async";

// Buffer를 전역으로 설정
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <MDXProvider>
        <App />
      </MDXProvider>
    </HelmetProvider>
  </React.StrictMode>
);
