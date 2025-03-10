import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader, LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("flex justify-center items-center", {
  variants: {
    variant: {
      default: "",
      circle: "",
    },
    size: {
      default: "[&_svg]:size-5",
      sm: "[&_svg]:size-4",
      lg: "[&_svg]:size-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Spinner({
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof spinnerVariants>) {
  return (
    <div
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    >
      {variant === "default" && <Loader className="animate-spin" />}
      {variant === "circle" && <LoaderCircle className="animate-spin" />}
    </div>
  );
}

export { Spinner, spinnerVariants };
