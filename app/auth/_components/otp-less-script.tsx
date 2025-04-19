"use client";
import { useLoginWithWhatsapp } from "@/services/auth/auth-hook";
import * as React from "react";

export const OTPlessScript = () => {
  const { mutate: loginWithWhatsapp } = useLoginWithWhatsapp();

  React.useEffect(() => {
    (window as any).otpless = (otplessUser: any) => {
      // Handle both successful authentication and cancellation
      if (otplessUser.token) {
        loginWithWhatsapp({ token: otplessUser.token });
      } else if (otplessUser.error) {
        // Handle specific error cases
        if (otplessUser.error.code === "CANCELLED") {
          console.log("User cancelled OTP verification");
          // You can add UI feedback or retry logic here
        } else {
          console.error("OTPless error:", otplessUser.error);
        }
      } else {
        console.error("OTPless user token not found");
      }
    };

    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.type = "text/javascript";
    script.src = "https://otpless.com/v4/auth.js";
    script.setAttribute("data-appid", "QT1FN12KD5VLLIUZOVZ1");
    // Add error handling for the script
    script.onerror = () => {
      console.error("Failed to load OTPless script");
    };
    script.async = true;
    script.onload = () => {
      console.log("OTPless script loaded!");
    };

    document.body.appendChild(script);

    return () => {
      // Check if script exists before removing
      const scriptElement = document.getElementById("otpless-sdk");
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
      // Clean up the global callback
      (window as any).otpless = undefined;
    };
  }, [loginWithWhatsapp]);

  return null;
};
