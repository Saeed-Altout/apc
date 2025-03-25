"use client";
import * as React from "react";
import { LogOut } from "lucide-react";

import { ModalType } from "@/config/enums";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  const { onOpen } = useModal();

  return (
    <Button
      variant="ghost"
      className="justify-start w-full"
      onClick={() => onOpen(ModalType.LOGOUT)}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Log out
    </Button>
  );
};
