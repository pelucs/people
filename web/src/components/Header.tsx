import Image from "next/image";
import logo from '@/assets/logotipo-socioambiental.png';
import Link from "next/link";

import { Button } from "./ui/button";
import { getUser } from "@/lib/auth";
import { Separator } from "./ui/separator";
import { LayoutGrid, LogOut, Search } from "lucide-react";

export function Header(){

  const user = getUser();

  return(
    <div className="flex-1 h-16 px-5 md:px-14 flex items-center justify-between border-b">
      <Link href="/">
        <Image 
          src={logo}
          alt="Logo BeHero"
          className="w-40"
        />
      </Link>

      <div className="flex items-center gap-5">
        <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-muted-foreground">
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
          <Button variant="secondary" size="icon" className="size-8">
            <Search className="size-4"/>
          </Button>

          {user && (
            <>
              <Button asChild size="sm" className="h-8 gap-2">
                <Link href="/dashboard">
                  <LayoutGrid className="size-4"/>

                  Dashboard
                </Link>
              </Button>

              <Button 
                asChild 
                size="icon" 
                variant="destructive"
                className="size-8 gap-2"
              >
                <Link href="/api/auth/logout">
                  <LogOut className="size-4"/>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}