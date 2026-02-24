import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Work, Post, Member, Category, SiteConfig } from "./types";

const contentDir = path.join(process.cwd(), "content");

export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(path.join(contentDir, "site.json"), "utf-8");
  return JSON.parse(raw);
}

export function getCategories(): Category[] {
  const raw = fs.readFileSync(path.join(contentDir, "categories.json"), "utf-8");
  return JSON.parse(raw);
}

export function getMembers(): Member[] {
  const raw = fs.readFileSync(path.join(contentDir, "members.json"), "utf-8");
  return JSON.parse(raw);
}

export function getMemberById(id: string): Member | undefined {
  return getMembers().find((m) => m.id === id);
}

export function getAllWorks(): Work[] {
  const worksDir = path.join(contentDir, "works");
  const files = fs.readdirSync(worksDir).filter((f) => f.endsWith(".json"));
  const works = files.map((file) => {
    const raw = fs.readFileSync(path.join(worksDir, file), "utf-8");
    return JSON.parse(raw) as Work;
  });
  return works.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getWorkBySlug(slug: string): Work | undefined {
  return getAllWorks().find((w) => w.slug === slug);
}

export function getFeaturedWorks(): Work[] {
  return getAllWorks().filter((w) => w.featured);
}

export function getWorksByCategory(category: string): Work[] {
  if (!category || category === "all") return getAllWorks();
  return getAllWorks().filter((w) => w.category === category);
}

export function getAllPosts(): Post[] {
  const blogDir = path.join(contentDir, "blog");
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      author: data.author,
      thumbnail: data.thumbnail,
      content,
    } as Post;
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
