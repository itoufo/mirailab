import { getAllPosts } from "@/lib/content";
import { PostList } from "@/components/blog/post-list";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <Section className="bg-muted/30">
      <div className="flex items-end justify-between">
        <SectionHeader
          title="Latest Posts"
          description="最新のブログ記事"
          className="mb-0"
        />
        <Button href="/blog" variant="ghost" size="sm" className="hidden sm:inline-flex">
          すべて見る
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Button href="/blog" variant="outline" size="sm">
          すべての記事を見る
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
    </Section>
  );
}
