import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        {/* 루트 경로를 /blog로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/blog" replace />} />

        {/* 각 페이지 라우트 */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />

        {/* 404 페이지 - /blog로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/blog" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
