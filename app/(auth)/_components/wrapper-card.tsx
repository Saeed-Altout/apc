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

import { WhatsappProvider } from "./whatsapp-provider";

interface WrapperCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  whatsappProvider?: boolean;
}

export const WrapperCard = ({
  children,
  title,
  description,
  whatsappProvider = true,
}: WrapperCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
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
            <WhatsappProvider />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
