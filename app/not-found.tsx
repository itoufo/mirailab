import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        ページが見つかりませんでした
      </p>
      <Button href="/" variant="outline" className="mt-6">
        トップに戻る
      </Button>
    </div>
  );
}
