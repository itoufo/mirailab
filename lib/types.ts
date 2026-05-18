export type CategoryId = "saas" | "game" | "tool" | "other";

export type ServiceGroup = "original" | "education" | "consulting" | "publishing";

export interface Service {
  slug: string;
  name: string;
  group: ServiceGroup;
  tagline: string;
  description: string;
  url?: string;
  logo: string;
  tags: string[];
  featured?: boolean;
  releaseLabel?: string;
  releaseDate?: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  url?: string;
  logo: string;
  tags: string[];
}

export type ReleaseType = "launch" | "feature" | "improvement" | "campaign";

export interface Release {
  slug: string;
  service: string;
  serviceName: string;
  type: ReleaseType;
  title: string;
  date: string;
  provider: string;
  summary: string;
  url?: string;
  image?: string;
  body: string;
}

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
