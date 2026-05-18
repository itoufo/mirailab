"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { ArrowRight, Sparkles } from "lucide-react";

// Client-only WebGL background; poster image below stays as fallback/LCP.
const HeroCanvas = dynamic(() => import("./hero-canvas"), { ssr: false });

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Interactive particle flow over the poster */}
        <HeroCanvas />
        {/* Left-darkened overlay keeps text readable while the light flow stays visible on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/85 to-[#030712]/25" />
        {/* Blend the bottom edge into the page below (theme-aware) */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <FadeIn delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              SaaS / Service / Education / Publishing
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="text-primary">Precision</span>
              {" & "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Creativity
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-slate-300 sm:text-xl">
              MirAI-Lab は、自社オリジナルサービスを軸に教育・コンサルティング・出版へと事業を広げる
              クリエイティブ集団です。テクノロジーとクリエイティビティの融合で、新しい価値を生み出します。
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/services" size="lg">
                Services を見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                href="/partners"
                variant="outline"
                size="lg"
                className="border-white/30 !text-white hover:bg-white/10"
              >
                参画企業を見る
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
