"use client";

import { useState } from "react";
import { WorkGrid } from "@/components/works/work-grid";
import type { Work, Category } from "@/lib/types";

interface WorksPageClientProps {
  works: Work[];
  categories: Category[];
}

export function WorksPageClient({ works, categories }: WorksPageClientProps) {
  const [current, setCurrent] = useState("all");

  const filtered = current === "all" ? works : works.filter((w) => w.category === current);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setCurrent("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            current === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCurrent(cat.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              current === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <WorkGrid works={filtered} />
    </>
  );
}
