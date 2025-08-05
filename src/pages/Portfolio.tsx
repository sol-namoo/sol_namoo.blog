import { PortfolioPage } from "../components/pages/PortfolioPage";
import { Layout, useLayout } from "../components/layout/Layout";
import { projects } from "../data";

const PortfolioContent = () => {
  const { isDark, currentLang } = useLayout();

  return (
    <PortfolioPage
      isDark={isDark}
      currentLang={currentLang}
      projects={projects}
    />
  );
};

const Portfolio = () => {
  return (
    <Layout>
      <PortfolioContent />
    </Layout>
  );
};

export default Portfolio;
