import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { ServiceCard } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ArrowRight } from "lucide-react";
import type { ServiceGroup } from "@/lib/types";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MirAI-Lab のオリジナルサービス・教育・コンサルティング・出版事業を紹介。MirAI-POST / miraipage をはじめ、AI時代の価値を生み出す事業群。",
};

const groupOrder: { id: ServiceGroup; title: string; description: string }[] = [
  {
    id: "original",
    title: "オリジナルサービス",
    description: "MirAI-Lab が自社で企画・開発・運営するプロダクト",
  },
  {
    id: "education",
    title: "教育サービス",
    description: "AI時代に「自分で考える力」を育てる育成プログラム",
  },
  {
    id: "consulting",
    title: "コンサルティング",
    description: "LLM時代の可視性戦略を伴走支援",
  },
  {
    id: "publishing",
    title: "出版事業",
    description: "コンテンツの企画・制作・配信",
  },
];

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <Section>
        <SectionHeader
          title="Services"
          description="MirAI-Lab が展開する事業・サービス"
        />
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-muted-foreground">
            MirAI-Lab は、自社オリジナルサービスを軸に、教育・コンサルティング・出版へと
            事業領域を広げています。AIを設計し、人の創造性を拡張するプロダクトと事業群です。
          </p>
        </div>
      </Section>

      {groupOrder.map((group, index) => {
        const items = services.filter((s) => s.group === group.id);
        if (items.length === 0) return null;
        return (
          <Section
            key={group.id}
            className={index % 2 === 0 ? "bg-muted/30" : ""}
          >
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <SectionHeader
                title={group.title}
                description={group.description}
                className="mb-0"
              />
              {group.id === "original" && (
                <Button href="/releases" variant="ghost" size="sm">
                  リリース情報
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((service) => (
                <StaggerItem key={service.slug}>
                  <ServiceCard service={service} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Section>
        );
      })}
    </>
  );
}
