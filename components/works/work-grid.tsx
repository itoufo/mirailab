"use client";

import { WorkCard } from "./work-card";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import type { Work } from "@/lib/types";

interface WorkGridProps {
  works: Work[];
}

export function WorkGrid({ works }: WorkGridProps) {
  if (works.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        該当する作品がありません
      </div>
    );
  }

  return (
    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {works.map((work) => (
        <StaggerItem key={work.slug}>
          <WorkCard work={work} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
