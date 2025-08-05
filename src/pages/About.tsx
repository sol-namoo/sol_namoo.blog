import React from "react";
import { AboutPage } from "../components/pages/AboutPage";
import { Layout, useLayout } from "../components/layout/Layout";
import { skills } from "../data";

const AboutContent = () => {
  const { isDark, currentLang, t } = useLayout();

  return (
    <AboutPage
      isDark={isDark}
      currentLang={currentLang}
      t={t}
      skills={skills}
    />
  );
};

const About = () => {
  return (
    <Layout>
      <AboutContent />
    </Layout>
  );
};

export default About;
