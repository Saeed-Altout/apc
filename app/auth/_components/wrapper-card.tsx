"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { Spinner } from "@/components/ui/spinner";

interface WrapperCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  whatsappProvider?: boolean;
  className?: string;
  onClick?: () => void;
}

export const WrapperCard = ({
  children,
  title,
  description,
  whatsappProvider = true,
  className,
  onClick,
}: WrapperCardProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        {title && (
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
        )}
        {description && (
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {whatsappProvider && (
        <CardFooter>
          <div className="w-full">
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs capitalize">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              type="button"
              className="w-full flex items-center justify-center bg-[#25D366] hover:bg-[#25D366]/90 text-white"
              onClick={onClick}
            >
              <FaWhatsapp size={18} />
              WhatsApp {false && <Spinner variant="circle" />}
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
