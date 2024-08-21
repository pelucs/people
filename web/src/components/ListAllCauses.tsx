"use client"

import Link from "next/link";
import Image from "next/image";
import example from "@/assets/example.jpg";

import { api } from "@/api/axios";
import { ptBR } from "date-fns/locale";
import { Cause } from "@/types/cause";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Loading } from "./Loading";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { ChevronRight, Plus, Search } from "lucide-react";
import { textFormated } from "@/helpers/regular-expression";

export function ListAllCauses() {

  const [search, setSearch] = useState<string>("");
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCauses = async () => {
      try {
        const response = await api.get("/causes/public");
        setCauses(response.data);
      } catch(err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    }

    getCauses();
  }, []);

  const filteredCausesBySearch = search.length > 0 ?
    causes.filter(cause => (
      cause.id.includes(textFormated(search)) 
      || textFormated(cause.description).includes(textFormated(search)) 
      || textFormated(cause.title).includes(textFormated(search)) 
      || textFormated(cause.location).includes(textFormated(search)))
    ) : causes

  return(
    <div id="causas" className="mt-5">  
      
      <div className="space-y-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">O que você está buscando?</h1>
          
          <div className="w-full max-w-xl relative">
            <Search className="size-6 text-muted-foreground absolute top-5 left-5"/>

            <input 
              placeholder="Pesquise aqui"
              onChange={e => setSearch(e.target.value)}
              className="w-full h-16 pl-14 pr-5 border bg-secondary rounded-full shadow"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Button className="font-medium text-green-800 bg-green-300">
            Todas
          </Button>

          <Separator orientation="vertical" className="h-6"/>
        </div>
      </div>

      <div className="w-full">
        {!loading ? (
          <>
            {filteredCausesBySearch.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                {filteredCausesBySearch.map((cause) => (
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

                        <p className="text-sm text-muted-foreground leading-tight">
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
              <div 
                className="w-full h-40 mt-5 flex items-center flex-col gap-4 justify-center rounded-md border 
                border-dashed border-zinc-300"
              >
                <span className="text-center text-muted-foreground">
                  Nenhuma causa registrada
                </span>

                <Button 
                  asChild 
                  className="gap-1 bg-green-500 hover:bg-green-600"
                >
                  <Link href="/nova-causa">
                    <Plus className="size-5"/>
                    
                    Nova Causa
                  </Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <Loading/>
            <Loading/>
          </div>
        )}
      </div>
    </div>
  );
}