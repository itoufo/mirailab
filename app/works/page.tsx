import type { Metadata } from "next";
import { getAllWorks, getCategories } from "@/lib/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { WorksPageClient } from "./works-client";

export const metadata: Metadata = {
  title: "Works",
  description: "MirAI-Lab の制作物一覧。フラッグシップSaaS「MirAI-POST」「miraipage」を紹介。",
};

export default function WorksPage() {
  const categories = getCategories();
  const works = getAllWorks();

  return (
    <Section>
      <SectionHeader title="Works" description="制作物一覧" />
      <WorksPageClient works={works} categories={categories} />
    </Section>
  );
}
