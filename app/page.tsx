import { Hero } from "@/components/home/hero";
import { FeaturedWorks } from "@/components/home/featured-works";
import { LatestPosts } from "@/components/home/latest-posts";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <LatestPosts />
    </>
  );
}
