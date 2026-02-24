import { getFeaturedWorks } from "@/lib/content";
import { WorkGrid } from "@/components/works/work-grid";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedWorks() {
  const works = getFeaturedWorks();

  return (
    <Section>
      <div className="flex items-end justify-between">
        <SectionHeader
          title="Featured Works"
          description="ピックアップ作品"
          className="mb-0"
        />
        <Button href="/works" variant="ghost" size="sm" className="hidden sm:inline-flex">
          すべて見る
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="mt-8">
        <WorkGrid works={works} />
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Button href="/works" variant="outline" size="sm">
          すべての作品を見る
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
    </Section>
  );
}
