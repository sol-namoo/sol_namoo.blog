import { AboutPage } from "../components/pages/AboutPage";
import { Layout, useLayout } from "../components/layout/Layout";
import { skills, educationKo, educationEn } from "../data";

const AboutContent = () => {
  const { isDark, currentLang, t } = useLayout();

  return (
    <AboutPage
      isDark={isDark}
      currentLang={currentLang}
      t={t}
      skills={skills}
      education={{ ko: educationKo, en: educationEn }}
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
