import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { BlogPageClient } from "./blog-client";

export const metadata: Metadata = {
  title: "Blog",
  description: "MirAI-Lab のブログ。技術記事、開発知見、クリエイティブに関する発信。",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <Section>
      <SectionHeader title="Blog" description="技術記事・開発知見" />
      <BlogPageClient posts={posts} tags={tags} />
    </Section>
  );
}
