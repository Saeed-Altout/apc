"use client";
import * as React from "react";

import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useWhatsappProvider } from "@/services/auth/auth-hook";
import { Spinner } from "@/components/ui/spinner";

export const WhatsappProvider = () => {
  const { mutate: whatsappProvider, isPending } = useWhatsappProvider();

  const handleWhatsappProvider = () => {
    whatsappProvider({ token: "31366f9fe1c4416c9086a5706d517a09" });
  };

  return (
    <Button
      type="button"
      disabled={isPending}
      className="w-full flex items-center justify-center bg-[#25D366] hover:bg-[#25D366]/90 text-white"
      onClick={handleWhatsappProvider}
    >
      <FaWhatsapp size={18} />
      WhatsApp {isPending && <Spinner variant="circle" />}
    </Button>
  );
};
