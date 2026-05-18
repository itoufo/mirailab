"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <FadeIn delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              SaaS / Service / Education / Publishing
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-primary">Precision</span>
              {" & "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Creativity
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
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
              <Button href="/partners" variant="outline" size="lg">
                参画企業を見る
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
