"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BellRing, Search } from "lucide-react";
import { UserButton } from "./userButtons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex justify-between p-4 border-b-4 border-[#f4dfe2] h-16">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center border-gray-300 rounded-lg px-2.5 py-0.5">
          <Search className="h-4 w-4 mr-2.5" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="w-full border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <Button variant={"outline"}>
          <BellRing />
        </Button>
        <UserButton />
      </div>
    </div>
  );
};