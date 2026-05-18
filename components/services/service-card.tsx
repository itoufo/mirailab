import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import type { Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const hasUrl = Boolean(service.url);

  const inner = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={service.logo}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {service.releaseLabel && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              {service.releaseLabel}
              {service.releaseDate && (
                <span className="ml-1.5 font-normal opacity-80">
                  {new Date(service.releaseDate).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
              )}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
          {service.name}
        </h3>
        <p className="mt-1 text-base font-medium text-primary">{service.tagline}</p>
        <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        {hasUrl && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <ExternalLink className="h-3.5 w-3.5" />
            サービスを見る
          </span>
        )}
      </div>
    </article>
  );

  if (hasUrl) {
    return (
      <a
        href={service.url}
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
