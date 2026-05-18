import type { MetadataRoute } from "next";
import { getAllWorks, getAllPosts, getReleases } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mirailab.dev";

  const works = getAllWorks().map((work) => ({
    url: `${baseUrl}/works/${work.slug}`,
    lastModified: new Date(work.date),
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const releases = getReleases().map((release) => ({
    url: `${baseUrl}/releases/${release.slug}`,
    lastModified: new Date(release.date),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/releases`, lastModified: new Date() },
    { url: `${baseUrl}/works`, lastModified: new Date() },
    { url: `${baseUrl}/partners`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    ...works,
    ...releases,
    ...posts,
  ];
}
