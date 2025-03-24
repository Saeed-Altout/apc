import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { cookieStore } from "@/utils/cookie";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the user is authenticated
  const authToken = request.cookies.get(cookieStore.AUTH_TOKEN_KEY)?.value;
  const isAuthenticated = !!authToken;

  // Check if the path is an auth route (login page etc.)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Check if the path is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If the path is an API route, allow the request
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Redirect authenticated users trying to access auth routes
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  // Allow authenticated users to access protected routes
  if (isAuthenticated) {
    return NextResponse.next();
  }

  // Allow unauthenticated users to access public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Allow unauthenticated users to access auth routes
  if (!isAuthenticated && isAuthRoute) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access protected routes to login
  return NextResponse.redirect(new URL("/login", request.url));
}

// Define the paths that should be checked by the middleware
export const config = {
  matcher: [
    // Match all paths except static files, api routes, etc.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
