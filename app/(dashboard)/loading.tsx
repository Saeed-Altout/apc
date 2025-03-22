import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex items-center gap-4 p-6 bg-background rounded-lg shadow-sm">
        <LoadingSpinner size="md" variant="primary" />
        <div className="flex flex-col">
          <p className="font-medium">Loading dashboard</p>
          <p className="text-sm text-muted-foreground">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    </div>
  );
}
