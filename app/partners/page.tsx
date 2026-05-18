import type { Metadata } from "next";
import { getPartners } from "@/lib/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { PartnerCard } from "@/components/partners/partner-card";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "MirAI-Lab の参画企業一覧。株式会社ウォーカー・sunu・HAIIA など、事業を共に推進するパートナー企業を紹介します。",
};

export default function PartnersPage() {
  const partners = getPartners();

  return (
    <Section>
      <SectionHeader title="Partners" description="参画企業" />
      <div className="mb-10 max-w-3xl">
        <p className="text-base leading-relaxed text-muted-foreground">
          MirAI-Lab は、各領域で専門性を持つ企業とともに事業を推進しています。
          開発・メディア・教育・コンサルティングにわたるパートナーが、価値創造を支えています。
        </p>
      </div>
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <StaggerItem key={partner.id}>
            <PartnerCard partner={partner} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
