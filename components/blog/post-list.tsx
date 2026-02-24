"use client";

import { PostCard } from "./post-card";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import type { Post } from "@/lib/types";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        該当する記事がありません
      </div>
    );
  }

  return (
    <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <StaggerItem key={post.slug}>
          <PostCard post={post} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
