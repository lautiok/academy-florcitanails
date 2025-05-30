"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function SignOut() {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex mt-3">
      <Button onClick={handleSignOut}  variant="outline" className="w-full">
        Sign Out
      </Button>
    </div>
  );
}