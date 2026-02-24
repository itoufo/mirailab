"use client";

import { useState } from "react";
import { PostList } from "@/components/blog/post-list";
import type { Post } from "@/lib/types";

interface BlogPageClientProps {
  posts: Post[];
  tags: string[];
}

export function BlogPageClient({ posts, tags }: BlogPageClientProps) {
  const [current, setCurrent] = useState("all");

  const filtered = current === "all" ? posts : posts.filter((p) => p.tags.includes(current));

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
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setCurrent(tag)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              current === tag
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <PostList posts={filtered} />
    </>
  );
}
