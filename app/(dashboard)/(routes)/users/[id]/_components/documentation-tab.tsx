import React from "react";
import Image from "next/image";
import { IdCard, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const DocumentationTab = () => {
  // const url = "/100x100.svg";
  const url = "";

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Customer ID</h2>
        <div className="flex items-center justify-start gap-6">
          <div className="flex items-center justify-start gap-3">
            <div
              className={cn(
                "relative flex items-center justify-center rounded-xl w-24 h-24 border-2 border-dashed border-primary overflow-hidden",
                url && "border-double"
              )}
            >
              {!url ? (
                <ImageIcon
                  className="h-12 w-12 text-primary/80"
                  strokeWidth={0.5}
                />
              ) : (
                <Image
                  fill
                  src={url}
                  alt="Customer ID"
                  className="object-cover"
                />
              )}
            </div>
            <p className="text-sm font-medium text-primary capitalize">
              Image of the first side
            </p>
          </div>
          <Separator orientation="vertical" className="!h-24 bg-primary" />
          <div className="flex items-center justify-start gap-3">
            <div
              className={cn(
                "relative flex items-center justify-center rounded-xl w-24 h-24 border-2 border-dashed border-primary overflow-hidden",
                url && "border-double"
              )}
            >
              {!url ? (
                <ImageIcon
                  className="h-12 w-12 text-primary/80"
                  strokeWidth={0.5}
                />
              ) : (
                <Image
                  fill
                  src={url}
                  alt="Customer ID"
                  className="object-cover"
                />
              )}
            </div>
            <p className="text-sm font-medium text-primary capitalize">
              Image of the second side
            </p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Personal Information</h2>
        <div className="flex items-center justify-start gap-3">
          <IdCard className="h-12 w-12 text-primary" strokeWidth={0.5} />
          <p className="text-sm font-medium text-primary capitalize">
            123 Main Street, Suite 500, San Francisco, CA 94105, USA
          </p>
        </div>
      </div>
    </div>
  );
};
