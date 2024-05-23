import Image from "next/image";
import logo from '@/assets/logo.svg';
import Link from "next/link";

import { Button } from "./ui/button";
import { getUser } from "@/lib/auth";
import { Separator } from "./ui/separator";
import { ButtonCreateNewCause } from "./ButtonCreateNewCause";
import { HeartHandshake, LogOut } from "lucide-react";

export function Header(){

  const user = getUser();

  return(
    <div className="flex-1 h-16 md:h-24 flex items-center justify-between border-b md:border-none">
      <div className="flex items-center gap-5 md:gap-8">
        <Link href="/">
          <Image 
            src={logo}
            alt="Logo BeHero"
            className="w-24 md:w-36"
          />
        </Link>

        <nav className="flex items-center gap-4 text-sm font-semibold text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Causas
          </Link>

          <a 
            href="/causas" 
            target="_blank"
            className="hidden md:block hover:text-foreground transition-colors"
          >
            Rede social
          </a>
        </nav>
      </div>

      <div>
        {user ? (
          <div className="flex items-center space-x-3">
            <ButtonCreateNewCause/>
            <Separator orientation="vertical" className="h-8 text-secondary"/>
    
            <Link href="/perfil">
              <div className="size-9 md:size-11 rounded-full flex items-center justify-center text-white bg-green-500">
                {user.name.split("")[0]}
              </div>
            </Link>
    
            <Button asChild variant={"ghost"} size={"icon"}>
              <Link href="/api/auth/logout">
                <LogOut className="size-4"/>
              </Link>
            </Button>
          </div>
        ) : (
          <div>
            <Button 
              asChild 
              className="flex gap-1 bg-green-500 hover:bg-green-600"
            >
              <Link href="/login">
                <HeartHandshake className="hidden md:block size-5"/>
                
                Criar uma causa
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}