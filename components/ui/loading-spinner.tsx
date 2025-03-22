import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

export function LoadingSpinner({
  size = "md",
  className,
  variant = "primary",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: "w-4 h-4 border-[1.5px]",
    sm: "w-6 h-6 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-[3px]",
  };

  const variantClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-transparent border-b-transparent",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-label="Loading"
    />
  );
}
