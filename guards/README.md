# Route Protection Components

This directory contains components for protecting routes that require authentication and handling public routes.

## Components

1. `ProtectedRoutes` - A component wrapper that checks authentication and redirects to login if needed
2. `withAuth` - A higher-order component (HOC) for easily protecting routes
3. `PublicRoutes` - A component wrapper that redirects authenticated users away from public pages (like login)
4. `withPublic` - A higher-order component for easily handling public routes

## Usage Examples

### Using the ProtectedRoutes Component

Wrap any components or pages that require authentication:

```tsx
// Example protected layout
"use client";

import { ProtectedRoutes } from "@/guards/protected-routes";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoutes>
      <div className="dashboard-layout">
        {/* Dashboard navigation/sidebar */}
        <main>{children}</main>
      </div>
    </ProtectedRoutes>
  );
}
```

### Using the withAuth Higher-Order Component

Protect individual components or pages:

```tsx
// Example protected page
"use client";

import { withAuth } from "@/guards/with-auth";

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Dashboard content */}
    </div>
  );
}

// Export the protected version of the component
export default withAuth(DashboardPage);
```

### Using the PublicRoutes Component

Redirect authenticated users away from public pages:

```tsx
// Example public layout (like auth)
"use client";

import { PublicRoutes } from "@/guards/public-routes";

export default function AuthLayout({ children }) {
  return (
    <PublicRoutes>
      <div className="auth-layout">{children}</div>
    </PublicRoutes>
  );
}
```

### Using the withPublic Higher-Order Component

For individual public pages:

```tsx
// Example login page
"use client";

import { withPublic } from "@/guards/with-public";

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      {/* Login form */}
    </div>
  );
}

// Export the public version of the component
export default withPublic(LoginPage);
```

### Important Notes

1. Both authentication components check status using `AuthService.isAuthenticated()`
2. Unauthenticated users are redirected to the login page with the correct locale
3. Authenticated users trying to access public pages are redirected to the dashboard
4. During authentication check, nothing is rendered to prevent flashes of content
5. The components work with Next.js 13+ App Router
