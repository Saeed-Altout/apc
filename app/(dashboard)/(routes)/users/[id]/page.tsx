import * as React from "react";

import UserEditorClient from "./user-editor-client";

// Use hardcoded IDs instead of API for static builds
export async function generateStaticParams() {
  // For static builds, we'll include known routes
  return [
    { id: "new" },
    // Add any known user IDs here
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  return <UserEditorClient id={id} />;
}
