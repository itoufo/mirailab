import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight">
              <span className="text-primary">MirAI</span>
              <span className="text-muted-foreground">-Lab</span>
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Precision & Creativity
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Services
            </Link>
            <Link href="/releases" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Releases
            </Link>
            <Link href="/works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Works
            </Link>
            <Link href="/partners" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Partners
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/mirailab"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/mirailab"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MirAI-Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
