"use client"

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { KeyboardEvent, useState } from "react";

export function Search() {
  
  const navigation = useRouter();
  
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    const pathname = window.location.pathname;
    const searchPath = "/search";
  
    if (pathname === searchPath) {
      if (query) {
        navigation.push(`${searchPath}?query=${encodeURIComponent(query)}`);
      } else {
        window.location.reload();
      }
    } else {
      navigation.push(query ? `${searchPath}?query=${encodeURIComponent(query)}` : searchPath);
    }
  };
  

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex items-center border rounded-md">
      <Button
        size="icon"
        variant={open ? "default" : "ghost"}
        onClick={() => setOpen(!open)}
      >
        <SearchIcon className="size-4" />
      </Button>

      <input
        type="search"
        value={query}
        onKeyDown={handleKeyDown}
        onChange={e => setQuery(e.target.value)}
        placeholder="O que você está procurando?"
        className={cn("h-10 text-sm outline-none transition-all no-clear-button", {
          "w-60 px-3 visible": open,
          "w-0 invisible": !open,
        })}
      />
    </div>
  );
}
