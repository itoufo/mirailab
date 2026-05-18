import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getReleases, getReleaseBySlug, getServices } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { ReleaseType } from "@/lib/types";

interface ReleaseDetailPageProps {
  params: Promise<{ slug: string }>;
}

const typeLabel: Record<ReleaseType, string> = {
  launch: "リリース",
  feature: "機能追加",
  improvement: "改善",
  campaign: "キャンペーン",
};

export function generateStaticParams() {
  return getReleases().map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({
  params,
}: ReleaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) return {};
  return {
    title: `${release.title} | ${release.serviceName}`,
    description: release.summary,
  };
}

export default async function ReleaseDetailPage({
  params,
}: ReleaseDetailPageProps) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) notFound();

  const service = getServices().find((s) => s.slug === release.service);

  return (
    <Section>
      <Link
        href="/releases"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Releases 一覧に戻る
      </Link>

      <div className="max-w-3xl">
        {release.image && (
          <div className="relative mb-8 aspect-[3/2] overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={release.image}
              alt={release.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          {service?.releaseLabel && (
            <Tag variant="primary">{service.releaseLabel}</Tag>
          )}
          <span className="text-sm font-medium text-foreground">
            {release.serviceName}
          </span>
          <Tag variant={release.type === "launch" ? "primary" : "default"}>
            {typeLabel[release.type]}
          </Tag>
          <time className="text-sm text-muted-foreground">
            {new Date(release.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          {release.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {release.summary}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          発表元：{release.provider}
        </p>

        {release.url && (
          <div className="mt-5">
            <Button href={release.url} external size="sm">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              サービスサイト
            </Button>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-border bg-muted/30 p-5 sm:p-8">
          <Markdown>{release.body}</Markdown>
        </div>
      </div>
    </Section>
  );
}
