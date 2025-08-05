import React from "react";
import { PortfolioPage } from "../components/pages/PortfolioPage";
import { Layout, useLayout } from "../components/layout/Layout";
import { projects } from "../data";

const PortfolioContent = () => {
  const { isDark, currentLang, t } = useLayout();

  return (
    <PortfolioPage
      isDark={isDark}
      currentLang={currentLang}
      t={t}
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
