import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Work,
  Post,
  Member,
  Category,
  SiteConfig,
  Service,
  ServiceGroup,
  Partner,
  Release,
} from "./types";

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

export function getServices(): Service[] {
  const raw = fs.readFileSync(path.join(contentDir, "services.json"), "utf-8");
  return JSON.parse(raw) as Service[];
}

export function getFeaturedServices(): Service[] {
  return getServices().filter((s) => s.featured);
}

export function getServicesByGroup(group: ServiceGroup): Service[] {
  return getServices().filter((s) => s.group === group);
}

export function getPartners(): Partner[] {
  const raw = fs.readFileSync(path.join(contentDir, "partners.json"), "utf-8");
  return JSON.parse(raw) as Partner[];
}

export function getReleases(): Release[] {
  const raw = fs.readFileSync(path.join(contentDir, "releases.json"), "utf-8");
  const entries = JSON.parse(raw) as (Omit<Release, "body"> & {
    bodyFile: string;
  })[];
  return entries
    .map(({ bodyFile, ...meta }) => {
      const raw = fs.readFileSync(
        path.join(contentDir, "releases", bodyFile),
        "utf-8"
      );
      let body = raw
        // 先頭の YAML フロントマター（--- ... ---）があれば除去
        .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "")
        // 装飾のみの区切り線（＝＝＝ / ─── 等）を除去（内容は保持）
        .replace(/^[ \t]*[＝═=─━\-—_]{8,}[ \t]*$/gm, "");
      // プレスリリース（中央寄せの字下げが多い）は行頭スペースを除去して
      // Markdown のコードブロック誤認を防ぐ。Markdown 原稿は字下げを保持する。
      if (/報道関係者各位/.test(body)) {
        body = body.replace(/^[ \t　]+/gm, "");
      }
      body = body
        // 行頭の「・」箇条書きを Markdown リストに正規化（内容は保持）
        .replace(/^[ \t　]*・[ \t　]*/gm, "- ")
        // プレスリリースとして絵文字は避ける（装飾ピクトグラムを除去）
        .replace(
          /[\p{Extended_Pictographic}\u200D\uFE0F\u{1F3FB}-\u{1F3FF}]/gu,
          ""
        )
        // 見出し記号直後の余分な空白を整える（絵文字除去の後始末）
        .replace(/^(#{1,6})[ \t]+/gm, "$1 ")
        // 行末の余分な空白を除去
        .replace(/[ \t]+$/gm, "")
        // 連続する空行を圧縮
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      // リリースサムネ: public/images/releases/<slug>.png が存在すれば採用
      const imgRel = `/images/releases/${meta.slug}.png`;
      const image = fs.existsSync(
        path.join(process.cwd(), "public", imgRel)
      )
        ? imgRel
        : undefined;
      return { ...meta, image, body };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getReleaseBySlug(slug: string): Release | undefined {
  return getReleases().find((r) => r.slug === slug);
}

export function getReleasesByService(service: string): Release[] {
  return getReleases().filter((r) => r.service === service);
}

export function getLatestReleaseByService(
  service: string
): Release | undefined {
  return getReleasesByService(service)[0];
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
