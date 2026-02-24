import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWorks, getWorkBySlug, getMemberById, getCategories } from "@/lib/content";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ArrowLeft, ExternalLink, Github, ShieldCheck, Search } from "lucide-react";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const works = getAllWorks();
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.description,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const categories = getCategories();
  const category = categories.find((c) => c.id === work.category);
  const members = work.members.map((id) => getMemberById(id)).filter(Boolean);

  return (
    <Section>
      <Link
        href="/works"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Works 一覧に戻る
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            {category && (
              <Tag variant="primary" className="mb-3">
                {category.label}
              </Tag>
            )}
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {work.title}
            </h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {work.description}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {work.techStack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tags
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <Tag key={tag} variant="primary">{tag}</Tag>
              ))}
            </div>
          </div>

          {members.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Members
              </h2>
              <div className="flex flex-wrap gap-3">
                {members.map((member) =>
                  member ? (
                    <div key={member.id} className="flex items-center gap-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-muted">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {work.services && work.services.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Services
              </h2>
              <div className="space-y-3">
                {work.services.map((service) => (
                  <div
                    key={service.name}
                    className="rounded-lg border border-border bg-muted/30 p-4"
                  >
                    <div className="flex items-center gap-2">
                      {service.name.includes("SEO") || service.name.includes("LLMO") ? (
                        <Search className="h-4 w-4 text-primary" />
                      ) : (
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      )}
                      <h3 className="text-sm font-semibold">{service.name}</h3>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {work.url && (
              <Button href={work.url} external size="sm">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Visit
              </Button>
            )}
            {work.github && (
              <Button href={work.github} variant="outline" external size="sm">
                <Github className="mr-1.5 h-3.5 w-3.5" />
                GitHub
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            {new Date(work.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>
    </Section>
  );
}
