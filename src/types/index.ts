export interface BlogPost {
  id: string;
  emoji: string;
  title: {
    ko: string;
    en: string;
  };
  date: string;
  author: string;
  tags: string[];
  category: string;
  excerpt: {
    ko: string;
    en: string;
  };
  content: string;
}

export interface Project {
  id: number;
  title: { ko: string; en: string };
  description: { ko: string; en: string };
  tech: string[];
  image: string;
  github: string;
  demo: string;
  type: "work" | "side" | "personal";
  team: "individual" | "team";
  year: number;
}

export interface Skill {
  name: string;
  color: string;
}

export interface Texts {
  ko: {
    nav: {
      blog: string;
      portfolio: string;
      about: string;
    };
    blog: {
      title: string;
      categories: {
        all: string;
        retrospect: string;
        til: string;
        review: string;
      };
    };
    portfolio: {
      title: string;
    };
    about: {
      title: string;
      greeting: string;
      name: string;
      jobTitle: string;
      description: string;
      skills: string;
      contact: string;
    };
    footer: {
      rights: string;
    };
  };
  en: {
    nav: {
      blog: string;
      portfolio: string;
      about: string;
    };
    blog: {
      title: string;
      categories: {
        all: string;
        retrospect: string;
        til: string;
        review: string;
      };
    };
    portfolio: {
      title: string;
    };
    about: {
      title: string;
      greeting: string;
      name: string;
      jobTitle: string;
      description: string;
      skills: string;
      contact: string;
    };
    footer: {
      rights: string;
    };
  };
}
