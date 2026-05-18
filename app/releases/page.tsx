import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getReleases, getServices } from "@/lib/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { ReleaseType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "MirAI-Lab プロダクトのリリース情報。第1弾 MirAI-POST、第2弾 miraipage のローンチと機能追加をリリースごとに掲載。",
};

const typeLabel: Record<ReleaseType, string> = {
  launch: "リリース",
  feature: "機能追加",
  improvement: "改善",
  campaign: "キャンペーン",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReleasesPage() {
  const releases = getReleases();
  const services = getServices();

  // 第1弾 → 第2弾 の順（services.json の featured オリジナル順）
  const serviceOrder = services
    .filter((s) => s.group === "original")
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      label: s.releaseLabel,
      url: s.url,
    }));

  return (
    <Section>
      <SectionHeader
        title="Releases"
        description="MirAI-Lab プロダクトのリリース情報"
      />
      <div className="mb-12 max-w-3xl">
        <p className="text-base leading-relaxed text-muted-foreground">
          各プロダクトのローンチと、その後の機能追加・キャンペーンを
          リリースごとに記録しています。詳細は各リリースのページをご覧ください。
        </p>
      </div>

      <div className="space-y-16">
        {serviceOrder.map((svc) => {
          const items = releases.filter((r) => r.service === svc.slug);
          if (items.length === 0) return null;
          return (
            <div key={svc.slug}>
              <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-border pb-4">
                {svc.label && <Tag variant="primary">{svc.label}</Tag>}
                <h2 className="text-2xl font-bold tracking-tight">
                  {svc.name}
                </h2>
                <span className="text-sm text-muted-foreground">
                  全 {items.length} 件のリリース
                </span>
                {svc.url && (
                  <a
                    href={svc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-primary"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    サービスサイト
                  </a>
                )}
              </div>

              <ul className="space-y-4">
                {items.map((release) => (
                  <li key={release.slug}>
                    <Link
                      href={`/releases/${release.slug}`}
                      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:flex-row"
                    >
                      {release.image && (
                        <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-muted sm:aspect-auto sm:w-64">
                          <Image
                            src={release.image}
                            alt={release.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 256px"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <Tag
                            variant={
                              release.type === "launch" ? "primary" : "default"
                            }
                          >
                            {typeLabel[release.type]}
                          </Tag>
                          <time className="text-sm text-muted-foreground">
                            {formatDate(release.date)}
                          </time>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                          {release.title}
                        </h3>
                        <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
                          {release.summary}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          詳細を読む
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
