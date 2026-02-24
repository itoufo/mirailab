interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/30 ${className}`}
    >
      {children}
    </div>
  );
}
