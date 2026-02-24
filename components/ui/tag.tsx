interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "primary";
  className?: string;
}

export function Tag({ children, variant = "default", className = "" }: TagProps) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors";
  const variants = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
  };

  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
