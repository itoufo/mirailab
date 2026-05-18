import { getFeaturedServices } from "@/lib/content";
import { ServiceCard } from "@/components/services/service-card";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ArrowRight } from "lucide-react";

export function FeaturedServices() {
  const services = getFeaturedServices();

  return (
    <Section className="bg-muted/30">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader
          title="Original Services"
          description="MirAI-Lab プロダクトライン ── 第1弾 MirAI-POST / 第2弾 miraipage"
          className="mb-0"
        />
        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          <Button href="/releases" variant="ghost" size="sm">
            リリース情報
          </Button>
          <Button href="/services" variant="ghost" size="sm">
            すべて見る
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
      <div className="mt-6 flex justify-center gap-3 sm:hidden">
        <Button href="/releases" variant="outline" size="sm">
          リリース情報
        </Button>
        <Button href="/services" variant="outline" size="sm">
          すべてのサービス
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
    </Section>
  );
}
