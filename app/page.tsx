import { Hero } from "@/components/home/hero";
import { FeaturedServices } from "@/components/home/featured-services";
import { LatestPosts } from "@/components/home/latest-posts";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <LatestPosts />
    </>
  );
}
