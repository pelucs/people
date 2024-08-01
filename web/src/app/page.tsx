import bg from "../assets/bg.png";
import illustration from "../assets/illustration-1.png";

import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { ListAllCauses } from "@/components/ListAllCauses";
import { 
  ChevronsDown, 
  HeartHandshake, 
  Instagram, 
  Phone, 
  ShieldCheck, 
  ThumbsUp 
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

export default async () => {
  return(
    <div className="w-full">
      <Header/>
      
      <Link 
        href="" 
        className="w-full h-10 flex items-center justify-center gap-1 bg-gradient-to-l text-white 
        to-green-500 from-orange-500"
      >
        Conheça mais sobre o departamento Socioambiental

        <ChevronsDown className="size-4 animate-bounce"/>
      </Link>

      <div className="md:px-14 px-5 mt-10 md:mt-20 space-y-16">
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col items-start justify-center gap-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-alt leading-none">
                Solidariedade, cuidado e voluntariado
              </h1>

              <span className="text-muted-foreground">
                Conectando corações generosos àqueles que mais precisam, criando uma rede de apoio e 
                solidariedade através do voluntariado.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/login">               
                  Seja herói de uma causa
                </Link>
              </Button>

              <div className="flex items-center gap-2">
                <Button asChild size="icon">
                  <a target="_blank" href="https://wa.me/5583986600008">
                    <Phone className="size-4"/>
                  </a>
                </Button>

                <Button asChild size="icon">
                  <a target="_blank" href="https://www.instagram.com/socioambiental_cg/">
                    <Instagram className="size-4"/>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image 
              alt="" 
              src={illustration}
              className=""
            />
          </div>
        </div>

        <Separator/>

        <div id="sobre-nos" className="py-5 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h1 className="font-alt text-2xl md:text-4xl">Quem somos?</h1>

            <p className="text-muted-foreground">
              Socioambiental é um departamento da Assembleia de Deus Vitória em Cristo, localizado na sede no 
              Rio de Janeiro, que se dedica à solidariedade, ao voluntariado e à disseminação da palavra de 
              Deus, refletidos em nossos atendimentos e acolhimentos aos mais necessitados.
              <br/>
              <br/>
              Essa plataforma é uma extensão de nossos esforços para expandir o alcance dos atendimentos na 
              região da Paraíba, uma iniciativa que teve origem na filial da ADVEC em Campina Grande. 
              Nossa missão é conectar corações generosos àqueles que mais precisam, proporcionando suporte 
              e esperança por meio de uma rede de apoio eficaz e compassiva.
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

        <ListAllCauses/>
      </div>

      <Footer/>
    </div>
  );
}