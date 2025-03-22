import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/10">
      <div className="flex flex-col items-center gap-2 p-8 bg-background rounded-lg shadow-sm">
        <LoadingSpinner size="md" variant="primary" />
        <p className="text-sm text-muted-foreground">
          Loading authentication...
        </p>
      </div>
    </div>
  );
}
