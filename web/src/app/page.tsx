import { api } from "@/api/axios";
import { Cause } from "@/types/cause";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ListAllCauses } from "@/components/ListAllCauses";

import Image from "next/image";
import bg from "../assets/bg.jpg";
import Link from "next/link";

export default async () => {
  return(
    <div className="w-full px-5 md:px-0 max-w-[1120px] mx-auto">
      <Header/>

      <div className="mt-10 md:mt-20">
        <div className="grid grid-cols-1  md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl md:text-4xl">
              Juntos Transformamos Vidas
              com Generosidade
            </h1>

            <span className="max-w-lg">
              Conectamos corações generosos a quem mais precisa, proporcionando esperança e transformando vidas através da solidariedade.
            </span>

            <div className="flex items-center gap-5">
              <Button 
                asChild 
                className="bg-green-500 hover:bg-green-600"
              >
                <a href="#causas">
                  Abrace uma causa
                </a>
              </Button>

              <Button 
                asChild
                variant={"link"}
              >
                <Link href="/nova-causa">
                  Criar uma causa
                </Link>
              </Button>
            </div>
          </div>

          <Image 
            src={bg}
            alt="Pessoa entregando um coração para outra pessoa"
            className="aspect-video rounded-xl"
          />
        </div>

        <div className="mt-20">
          <ListAllCauses/>
        </div>
      </div>

      <Footer/>
    </div>
  );
}