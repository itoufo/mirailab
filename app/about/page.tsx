import type { Metadata } from "next";
import { getMembers } from "@/lib/content";
import { MemberCard } from "@/components/about/member-card";
import { Section, SectionHeader } from "@/components/ui/section";
import { Code, Gamepad2, BookOpen, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "MirAI-Lab のチーム紹介。SaaS・ゲーム・小説を横断するクリエイティブ集団です。",
};

const values = [
  {
    icon: Cpu,
    title: "AI × Creativity",
    description: "AIをツールとして活用し、人間のクリエイティビティを拡張する。",
  },
  {
    icon: Code,
    title: "Precision Engineering",
    description: "高品質なコードとアーキテクチャで、堅牢なプロダクトを構築する。",
  },
  {
    icon: Gamepad2,
    title: "Multi-Genre",
    description: "SaaS・ゲーム・小説など、ジャンルの壁を越えて制作する。",
  },
  {
    icon: BookOpen,
    title: "Open Knowledge",
    description: "学んだ知見をブログやOSSで発信し、コミュニティに還元する。",
  },
];

export default function AboutPage() {
  const members = getMembers();

  return (
    <>
      <Section>
        <SectionHeader
          title="About MirAI-Lab"
          description="テクノロジーとクリエイティビティの融合"
        />
        <div className="max-w-3xl">
          <p className="text-muted-foreground leading-relaxed">
            MirAI-Lab は、AI時代のクリエイティブを探求するチームです。
            SaaS開発、ゲーム制作、小説執筆と、多岐にわたるジャンルでプロダクトを生み出しています。
            「Precision & Creativity」をモットーに、技術的な精度と創造性の両立を目指しています。
          </p>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeader title="Values" description="私たちが大切にしていること" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/30"
            >
              <value.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-semibold">{value.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title="Members" description="チームメンバー" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </Section>
    </>
  );
}
