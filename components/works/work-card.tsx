import Link from "next/link";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import type { Work } from "@/lib/types";

interface WorkCardProps {
  work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Link href={`/works/${work.slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute left-3 top-3">
            <Tag variant="primary">{work.category.toUpperCase()}</Tag>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold tracking-tight group-hover:text-primary transition-colors">
            {work.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {work.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {work.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
