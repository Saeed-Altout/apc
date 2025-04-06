# ProtectedRoute Component

A reusable component for implementing route protection in Next.js 15 app.

## Overview

The `ProtectedRoute` component provides authentication-based route protection for Next.js 15 applications using the App Router. It checks if a user is authenticated by verifying the presence of a token in localStorage, and redirects unauthenticated users to the login page.

## Features

- Redirects unauthenticated users to the login page
- Shows a loading state during authentication check
- Automatically skips authentication check for login and password-related pages
- Works with Next.js 15 App Router

## Usage

### Basic Usage

To protect a route, wrap it with the `ProtectedRoute` component:

```tsx
import { ProtectedRoute } from "@/components/protected-route";

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}
```

### Protecting a Layout

To protect all routes within a layout, wrap the layout's content with the `ProtectedRoute` component:

```tsx
// app/(dashboard)/layout.tsx
import { ProtectedRoute } from "@/components/protected-route";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="dashboard-layout">
        <nav>Dashboard Navigation</nav>
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
```

This will protect all routes under the `(dashboard)` route group.

## How It Works

The `ProtectedRoute` component:

1. Uses the `useEffect` hook to check authentication status on mount and route changes
2. Checks for a token using `StorageService.isAuthenticated()`
3. If authenticated, renders the children
4. If not authenticated, redirects to the login page using `router.push("/login")`
5. Shows a loading spinner during the authentication check

## Notes

- The component automatically bypasses protection for `/login`, `/forgot-password`, and `/new-password` routes
- The component is client-side only and uses the `"use client"` directive
- Requires the `StorageService` to be correctly implemented with an `isAuthenticated()` method
