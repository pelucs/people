"use client"

import { api } from "@/api/axios";
import { ptBR } from "date-fns/locale";
import { Cause } from "@/types/cause";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import { Eye, Plus } from "lucide-react";
import { UpdateCauseDialog } from "./UpdateCauseDialog";
import { DeleteCauseDialog } from "./DeleteCauseDialog";
import { useEffect, useState } from "react";

import Link from "next/link";

interface ListCausesProps {
  userId: string;
}

export function ListCausesByUser({ userId }: ListCausesProps) {

  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCauses = async () => {
      try {
        const response = await api.get(`/causes/${userId}`);
        setCauses(response.data);
      } catch(err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    }
    
    getCauses();
  }, []);

  return(
    <div className="w-full mt-16">
      <h1 className="text-2xl font-bold">Minhas causas</h1>

      {!loading ? (
        <>
          {causes.length > 0 ? (
            <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              {causes.map((cause) => (
                <div 
                  key={cause.id}
                  className="p-5 md:p-8 flex flex-col gap-5 rounded-md border border-transparent transition-colors hover:border-green-500 bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="label">Título</span>
                      <span className="font-medium">{cause.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button asChild size={"icon"} variant={"outline"}>
                        <Link href={`/causa/${cause.id}`}>
                          <Eye className="size-4"/>
                        </Link>
                      </Button>

                      <UpdateCauseDialog cause={cause}/>
                      <DeleteCauseDialog causeId={cause.id}/>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="label">Descrição</span>
                    <span className="font-medium leading-tight">
                      {cause.description}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="label">Localização</span>
                    <span className="font-medium">{cause.location}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="label">Contato</span>
                    <span className="font-medium">{cause.contact}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="label">Email</span>
                    <span className="font-medium">{cause.email}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="label">Registrado em</span>
                    <span className="font-medium">
                      {format(new Date(cause.createAt), "dd 'de' MMM, y", { locale: ptBR })}
                    </span>
                  </div>
                </div>
                ))
              }
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
                className="hidden md:flex gap-1 bg-green-500 hover:bg-green-600"
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
  );
}