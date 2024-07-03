import bg from "../assets/bg.png";

import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { ListAllCauses } from "@/components/ListAllCauses";
import { HeartHandshake, ShieldCheck, ThumbsUp } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default async () => {
  return(
    <div className="w-full px-5 md:px-0 max-w-[1120px] mx-auto">
      <Header/>

      <div className="mt-10 md:mt-20 space-y-16">
        <div className="flex flex-col items-center justify-center">
          <h1 className="max-w-[650px] text-4xl md:text-6xl text-center font-alt leading-none">
            Juntos Transformamos
            Vidas com <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-600">Generosidade</span>
          </h1>

          <span className="text-muted-foreground">
            A plataforma com 100% das causas verídicas
          </span>

          <div className="mt-10 flex items-center gap-5">
            <Button 
              asChild 
              className="w-[140px] flex gap-1 bg-green-500 hover:bg-green-600"
            >
              <Link href="/login">               
                Criar uma causa
              </Link>
            </Button>

            <Button 
              asChild
              className="w-[140px]"
            >
              <Link href="#sobre-nos">               
                Sobre nós
              </Link>
            </Button>
          </div>
        </div>

        <Separator/>

        <div id="sobre-nos" className="py-5 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h1 className="font-alt text-2xl md:text-4xl">Quem somos?</h1>
            <p>
              People é uma plataforma desenvolvida com a missão de conectar corações generosos a quem mais 
              precisa. O sistema permite o cadastro de causas carentes, tornando-as visíveis para doadores 
              em potencial, facilitando a contribuição e o apoio a essas causas.
            </p>
          
            <div className="mt-5 space-y-4">
              <span className="flex items-center gap-2 font-alt">
                <span className="size-7 flex items-center justify-center rounded bg-green-500">
                  <ShieldCheck className="size-4 text-background"/>
                </span>

                Causas verificadas
              </span>

              <span className="flex items-center gap-2 font-alt">
                <span className="size-7 flex items-center justify-center rounded bg-green-500">
                  <HeartHandshake className="size-4 text-background"/>
                </span>

                Comprometimento
              </span>

              <span className="flex items-center gap-2 font-alt">
                <span className="size-7 flex items-center justify-center rounded bg-green-500">
                  <ThumbsUp className="size-4 text-background"/>
                </span>

                Transparência
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image 
              alt="" 
              src={bg}
              className="w-[400px]"
            />
          </div>
        </div>

        <Separator/>

        <div>
          <ListAllCauses/>
        </div>
      </div>

      <Footer/>
    </div>
  );
}