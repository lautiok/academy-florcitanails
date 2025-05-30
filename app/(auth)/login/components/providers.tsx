"use client";

import { Button } from "@/components/ui/button";
import GoogleIcon from "./icons/GoogleIcon";
import { signIn } from "next-auth/react";

export function Providers() {
  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full h-11 border border-[#e0d2d3] text-[#444] rounded-md hover:bg-[#fafafa] transition"
      >
        <GoogleIcon className="mr-2 h-5 w-5" /> Continuar con Google
      </Button>
    </div>
  );
}
