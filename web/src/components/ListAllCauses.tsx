"use client"

import Link from "next/link";

import { api } from "@/api/axios";
import { Cause } from "@/types/cause";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { ChevronRight, Plus, Search } from "lucide-react";
import { Loading } from "./Loading";

export function ListAllCauses() {

  const [search, setSearch] = useState<string>("");
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCauses = async () => {
      try {
        const response = await api.get("/causes");
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
    causes.filter(cause => cause.id.toLowerCase().includes(search.toLowerCase()) || cause.description.toLowerCase().includes(search.toLowerCase()) ||
    cause.title.toLowerCase().includes(search.toLowerCase()) || cause.location.toLowerCase().includes(search.toLowerCase()))
    : causes

  return(
    <div id="causas" className="mt-5">  
      <div className="flex flex-col md:flex-row items-start md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-alt">
            Causas cadastradas
          </h1>

          <span className="text-sm text-muted-foreground font-semibold">
            {causes.length} causas cadastradas
          </span>
        </div>

        <div className="mt-3 md:mt-0 rounded-md relative bg-white">
          <Search className="size-4 text-muted-foreground absolute top-3 left-2.5"/>

          <input 
            placeholder="Pesquise aqui"
            onChange={e => setSearch(e.target.value)}
            className="py-2 pl-8 pr-3 bg-transparent"
          />
        </div>
      </div>

      <div className="w-full">
        {!loading ? (
          <>
            {filteredCausesBySearch.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCausesBySearch.map((cause) => (
                  <Link 
                    key={cause.id}
                    href={`/causa/${cause.id}`} 
                    className="p-5 md:p-8 flex flex-col gap-5 rounded-md border border-transparent transition-colors hover:border-green-500 bg-white"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="label">Título</span>
                      <span className="font-medium">{cause.title}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="label">Descrição</span>
                      <span className="font-medium leading-tight">{cause.description}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="label">Localização</span>
                      <span className="font-medium">{cause.location}</span>
                    </div>

                    <span className="flex items-center gap-1 underline font-semibold text-green-500">
                      Ver mais informações

                      <ChevronRight className="size-4"/>
                    </span>
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