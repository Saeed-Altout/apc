"use client";

import { ComponentType } from "react";
import { PublicRoutes } from "./public-routes";

// Higher-order component for public routes
export function withPublic<P extends object>(
  Component: ComponentType<P>
): ComponentType<P> {
  const WithPublic = (props: P) => (
    <PublicRoutes>
      <Component {...props} />
    </PublicRoutes>
  );

  // Add display name for debugging
  const displayName = Component.displayName || Component.name || "Component";
  WithPublic.displayName = `withPublic(${displayName})`;

  return WithPublic;
}
