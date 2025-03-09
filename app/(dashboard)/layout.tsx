import type { Metadata } from "next";
import { seoConfig } from "@/config";

export const metadata: Metadata = {
  title: seoConfig.defaultTitle,
  description: seoConfig.description,
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
