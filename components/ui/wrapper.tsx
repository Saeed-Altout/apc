import * as React from "react";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface WrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
  redirectTo?: string;
  isLoading?: boolean;
  actions?: React.ReactNode;
}

export const Wrapper = ({
  children,
  title,
  description,
  redirectTo,
  isLoading,
  actions,
}: WrapperProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
            {redirectTo && <Skeleton className="h-8 w-[100px]" />}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-[500px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center justify-end gap-x-2">
            {redirectTo && (
              <Link href={redirectTo}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
            )}
            {actions}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
};
