"use client"

import Image from "next/image";
import Link from "next/link";

import { api } from "@/api/axios";
import { ptBR } from "date-fns/locale";
import { Cause } from "@/types/cause";
import { format } from "date-fns";
import { Loading } from "@/components/Loading";
import { useEffect, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ListAllCauses } from "@/components/ListAllCauses";
import { SeeOtherCauses } from "../causa/[slug]/SeeOtherCauses";

export function ListCausesBySearch() {
  
  const query = useSearchParams();
  const navigation = useRouter();

  const [causes, setCauses] = useState<Cause[]>([]);
  
  useEffect(() => {
    if(query.get("query")) {
      const getCauses = async () => {
        try {
          const response = await api.get(`/causes/public?query=${query.get("query")}`);
          setCauses(response.data);
        } catch(err) {
          console.log(err)
        }
      }
  
      getCauses();
    } else {
      navigation.push("/")
    }

  }, []);

  return(
    <div>
      <div className="space-y-10">
        <h1 className="text-center text-2xl font-bold">
          Resultado da busca "{query.get("query")}"
        </h1>

        {query.get("query") ? (
          causes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {causes.map((cause) => (
                <Link 
                  key={cause.id}
                  href={`/causa/${cause.id}`}
                  className="rounded-xl overflow-hidden border hover:border-primary shadow relative
                  transition-colors bg-secondary"
                >
                  <div className="aspect-video overflow-hidden flex items-center justify-start">
                    <Image 
                      width={500}
                      height={500}
                      src={cause.imagesUrl[0]} 
                      alt="" 
                    />
                  </div>

                  <div className="py-5 px-6 space-y-5">
                    <div className="flex flex-col gap-1">
                      <h1 className="leading-tight text-lg font-semibold">
                        {cause.title}
                      </h1>

                      <p className="text-sm text-muted-foreground leading-tight truncate">
                        {cause.description}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-muted-foreground">Registrada em</span>

                      <p className="font-medium leading-tight">
                        {format(new Date(cause.createAt), "dd 'de' MMM, y", { locale: ptBR })}
                      </p>
                    </div>

                    <span className="flex items-center gap-2 text-primary underline font-semibold">
                      Ver mais informações

                      <ChevronRight className="size-4"/>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              <div className="w-full max-w-md py-5 px-6 mx-auto flex flex-col bg-secondary 
              rounded-xl space-y-2">
                <h1 className="text-lg text-muted-foreground">Nenhuma causa encontrada</h1>

                <ul className="text-sm list-disc list-inside">
                  <li>Verifique a ortografia da palavra ou frase que digitou;</li>
                  <li>Pesquise por outros termos semelhantes ou mais comuns;</li>
                  <li>Utilize termos mais amplos ou menos específicos.</li>
                </ul>
              </div>

              <SeeOtherCauses/>
            </div>
          )
        ) : (
          <Loading/>
        )}
      </div>
    </div>
  );
}