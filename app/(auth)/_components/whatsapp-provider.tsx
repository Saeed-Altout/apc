"use client";
import * as React from "react";

import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export const WhatsappProvider = () => {
  return (
    <Button
      type="button"
      className="w-full flex items-center justify-center bg-[#25D366] hover:bg-[#25D366]/90 text-white"
    >
      <FaWhatsapp size={18} />
      WhatsApp {false && <Spinner variant="circle" />}
    </Button>
  );
};
