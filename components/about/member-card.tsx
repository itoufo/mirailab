import Image from "next/image";
import { Github, Twitter, Globe } from "lucide-react";
import type { Member } from "@/lib/types";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-background p-6 text-center transition-colors hover:border-primary/30">
      <div className="relative h-24 w-24 overflow-hidden rounded-full bg-muted">
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
      <p className="text-sm text-primary">{member.role}</p>
      <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
      {member.links && (
        <div className="mt-3 flex items-center gap-2">
          {member.links.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${member.name}'s GitHub`}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {member.links.twitter && (
            <a
              href={member.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${member.name}'s Twitter`}
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}
          {member.links.website && (
            <a
              href={member.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${member.name}'s Website`}
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
