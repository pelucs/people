"use client"

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X } from "lucide-react";
import { KeyboardEvent, useState } from "react";

export function Search() {
  
  const navigation = useRouter();
  
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter' && query) {
      event.preventDefault();
      navigation.push(`/search?query=${query}`)
    }
  }

  return (
    <div
      className={cn("", {
        "w-full h-20 flex items-center justify-center absolute top-0 left-0 bg-background border-b md:w-fit md:h-fit md:static md:border-none": open,
        "": !open
      })}
    >
      <div className="flex items-center border rounded-md">
        <Button
          size="icon"
          variant={open ? "default" : "ghost"}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="size-4"/>
          ) : (
            <SearchIcon className="size-4" />
          )}
        </Button>

        <input
          required
          type="search"
          value={query}
          onKeyDown={handleKeyDown}
          onChange={e => setQuery(e.target.value)}
          placeholder="O que você está procurando?"
          className={cn("h-10 text-sm outline-none transition-all no-clear-button", {
            "w-60 pl-3 pr-1 visible": open,
            "w-0 invisible": !open,
          })}
        />

        <span className={cn("text-[10px] p-px px-1 rounded bg-secondary text-muted-foreground", {
          "flex mr-3": open,
          "hidden": !open
        })}>
          Enter
        </span>
      </div>
    </div>
  );
}
