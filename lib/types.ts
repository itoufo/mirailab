export type CategoryId = "saas" | "game" | "novel" | "tool" | "other";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export interface Work {
  slug: string;
  title: string;
  description: string;
  category: CategoryId;
  thumbnail: string;
  tags: string[];
  techStack: string[];
  members: string[];
  url?: string;
  github?: string;
  featured?: boolean;
  date: string;
  services?: {
    name: string;
    description: string;
  }[];
}

export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  links?: {
    github?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  thumbnail?: string;
  content: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github?: string;
    twitter?: string;
  };
}
