import Image from "next/image";
import logo from '@/assets/logotipo-socioambiental.png';
import Link from "next/link";

import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Separator } from "./ui/separator";

export function Header(){
  return(
    <div className="flex-1 h-16 flex items-center justify-between border-b">
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

        <Button size="icon" className="size-8">
          <Search className="size-4"/>
        </Button>
      </div>
    </div>
  );
}