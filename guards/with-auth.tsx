"use client";

import { ComponentType } from "react";
import { ProtectedRoutes } from "./protected-routes";

export function withAuth<P extends object>(
  Component: ComponentType<P>
): ComponentType<P> {
  const WithAuth = (props: P) => (
    <ProtectedRoutes>
      <Component {...props} />
    </ProtectedRoutes>
  );

  const displayName = Component.displayName || Component.name || "Component";
  WithAuth.displayName = `withAuth(${displayName})`;

  return WithAuth;
}
