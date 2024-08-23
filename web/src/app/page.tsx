import Image from "next/image";
import example from "../assets/example.jpg";

import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { ListAllCauses } from "@/components/ListAllCauses";
import { 
  ArrowRight, 
  ChevronRight, 
  HandHeart, 
  HeartHandshake, 
  ShieldCheck, 
  ThumbsUp 
} from "lucide-react";

export default async () => {
  return(
    <div className="w-full">
      <Header/>
      
      <div className="space-y-16">
        <div className="md:h-screen py-10 px-5 flex flex-col items-center justify-center gap-8 bg-center bg-cover bg-[url(../assets/bg.png)]">
          <div className="h-8 pr-3 flex items-center gap-2 rounded-full text-green-800 bg-primary/20">
            <span className="text-white size-8 rounded-full bg-primary flex items-center justify-center">
              <HeartHandshake className="size-4"/>
            </span>

            A plataforma 100% confiável

            <ChevronRight className="size-4"/>
          </div>

          <h1 className="text-center text-5xl md:text-6xl font-alt leading-none">
            Solidariedade, cuidado e <br/>
            voluntariado
          </h1>

          <p className="text-center md:text-xl w-full max-w-xl">
            Conectando corações generosos àqueles que mais precisam, criando uma rede de apoio e 
            solidariedade através do voluntariado.
          </p>

          <div>
            <Button asChild size="lg">
              <a href="#causas">
                Ver causas
              </a>
            </Button>

            <Button 
              asChild 
              size="lg" 
              variant="link" 
              className="text-lg gap-2"
            >
              <a href="#causas">
                Sobre nós

                <ArrowRight className="size-4"/>
              </a>
            </Button>
          </div>
        </div>

        <Separator id="sobre-nos"/>

        <div className="md:px-14">
          <div className="py-10 px-5 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 rounded-2xl bg-primary/10">
            <div className="">
              <div className=" overflow-hidden rounded-xl">
                <Image 
                  alt="" 
                  src={example}
                />
              </div>
            </div>
            
            <div className="flex flex-col justify-center gap-5">
              <h1 className="leading-tight font-alt text-2xl md:text-4xl">Quem somos?</h1>

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
            
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <span className="flex items-center gap-4 font-semibold">
                  <span className="size-6 flex items-center justify-center rounded-full bg-green-500">
                    <ShieldCheck className="size-4 text-background"/>
                  </span>

                  Causas verificadas
                </span>

                <span className="flex items-center gap-4 font-semibold">
                  <span className="size-6 flex items-center justify-center rounded-full bg-green-500">
                    <HeartHandshake className="size-4 text-background"/>
                  </span>

                  Comprometimento
                </span>

                <span className="flex items-center gap-4 font-semibold">
                  <span className="size-6 flex items-center justify-center rounded-full bg-green-500">
                    <ThumbsUp className="size-4 text-background"/>
                  </span>

                  Transparência
                </span>

                <span className="flex items-center gap-4 font-semibold">
                  <span className="size-6 flex items-center justify-center rounded-full bg-green-500">
                    <HandHeart className="size-4 text-background"/>
                  </span>

                  Voluntariado
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator/>

        <div id="causas" className="md:px-14 px-5">
          <ListAllCauses/>
        </div>
      </div>

      <Footer/>
    </div>
  );
}