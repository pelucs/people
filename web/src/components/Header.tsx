import Image from "next/image";
import logo from '@/assets/logotipo-socioambiental.png';
import Link from "next/link";

import { Button } from "./ui/button";
import { Search } from "./Search";
import { getUser } from "@/lib/auth";
import { Separator } from "./ui/separator";
import { LayoutGrid, LogOut, Menu, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Header(){

  const user = getUser();

  return(
    <div className="flex-1 h-20 px-5 md:px-14 flex items-center justify-between border-b">
      <Link href="/">
        <Image 
          src={logo}
          alt="Logo BeHero"
          className="w-full max-w-44"
        />
      </Link>

      <div className="flex items-center gap-5">
        <nav className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Causas
          </Link>

          <Link href="#sobre-nos" className="hover:text-foreground transition-colors">
            Sobre nós
          </Link>

          <Link href="#sobre-nos" className="hover:text-foreground transition-colors">
            Contato
          </Link>
        </nav>

        <Separator orientation="vertical" className="h-6"/>

        <div className="flex items-center gap-2">
          <Search/>

          {user && (
            <Popover>
              <Button 
                asChild
                variant="outline"
                className="rounded-full px-2"
              >
                <PopoverTrigger className="flex items-center gap-2">
                  <Menu className="size-4 ml-2"/>

                  <span className="size-7 flex items-center justify-center rounded-full bg-foreground">
                    <User className="size-4 text-background"/>
                  </span>
                </PopoverTrigger>
              </Button>

              <PopoverContent align="end" className="p-1.5 w-52">
                <Button 
                  asChild 
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  <Link href="/dashboard">
                    <LayoutGrid className="size-4"/>
                    Dashboard
                  </Link>
                </Button>

                <div className="px-2">
                  <Separator orientation="horizontal" className="my-1"/>
                </div>

                <Button 
                  asChild 
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  <Link href="/api/auth/logout">
                    <LogOut className="size-4"/>
                    Encerrar sessão
                  </Link>
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}