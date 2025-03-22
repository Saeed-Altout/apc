import Link from "next/link";

export default function AuthNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="text-xl font-medium">Authentication Page Not Found</h2>
      <p className="max-w-md text-muted-foreground">
        The authentication page you are looking for doesn't exist or has been
        moved.
      </p>
      <Link
        href="/login"
        className="px-4 py-2 mt-4 text-sm font-medium transition-colors bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Go to Login
      </Link>
    </div>
  );
}
