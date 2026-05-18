import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import type { Partner } from "@/lib/types";

interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const hasUrl = Boolean(partner.url);

  const inner = (
    <article className="flex h-full flex-col items-center rounded-xl border border-border bg-background p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-muted">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="80px"
        />
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
        {partner.name}
      </h3>
      <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
        {partner.description}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {partner.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      {hasUrl && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          <ExternalLink className="h-3.5 w-3.5" />
          Webサイト
        </span>
      )}
    </article>
  );

  if (hasUrl) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        {inner}
      </a>
    );
  }

  return <div className="group block h-full">{inner}</div>;
}
