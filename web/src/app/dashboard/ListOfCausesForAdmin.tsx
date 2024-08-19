"use client"

import { api } from "@/api/axios";
import { ptBR } from "date-fns/locale";
import { Cause } from "@/types/cause";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import { UpdateCauseDialog } from "./UpdateCauseDialog";
import { DeleteCauseDialog } from "./DeleteCauseDialog";
import { useEffect, useState } from "react";
import { Eye, Handshake, Plus } from "lucide-react";

import example from "@/assets/example.jpg";
import Link from "next/link";
import Image from "next/image";

export function ListOfCausesForAdmin() {

  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCauses = async () => {
      try {
        const response = await api.get(`/causes`);
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
    <div className="w-full flex flex-col gap-8">
      <div className="grid grid-cols-3 gap-5">
        <div className="w-full py-4 px-5 flex flex-col gap-2 rounded-md bg-secondary border shadow">
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-muted-foreground font-medium">Causas registradas</h1>
            <Handshake className="size-4 text-muted-foreground"/>
          </div>

          <strong className="text-4xl font-bold">
            {causes.length > 9 ? causes.length : "0" + causes.length}
          </strong>
        </div>

        <div className="w-full py-4 px-5 rounded-md bg-secondary border shadow"/>
        <div className="w-full py-4 px-5 rounded-md bg-secondary border shadow"/>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          Causas em aberto
        </h1>

        {!loading ? (
          <>
            {causes.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
                {causes.map(cause => (
                  <div 
                    key={cause.id} 
                    className="rounded-xl overflow-hidden border shadow relative group"
                  >
                    <div 
                      className="py-1 px-2 flex items-center gap-1 text-xs text-muted-foreground 
                      bg-secondary rounded-md absolute top-2 left-2 md:opacity-0 md:transition-opacity
                      md:group-hover:opacity-100"
                    >
                      <Eye className="size-4"/>

                      4 visitas
                    </div>

                    <Image 
                      src={example} 
                      alt="Exemplo" 
                      className=""
                    />

                    <div className="py-5 px-6 space-y-5">
                      <div className="space-y-2">
                        <h1 className="text-lg leading-none font-semibold">
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

                      <div className="flex items-center gap-2">
                        <Button asChild className="flex-1">
                          <Link href={`/causa/${cause.id}`}>
                            Visualizar
                          </Link>
                        </Button>

                        <UpdateCauseDialog cause={cause}/>
                        <DeleteCauseDialog causeId={cause.id}/>
                      </div>
                    </div>
                  </div>
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
    </div>
  );
}

{/* <div 
  key={cause.id}
  className="p-5 md:p-8 flex flex-col gap-5 rounded-md border border-transparent transition-colors
    hover:border-green-500 bg-secondary"
>
  <div className="flex items-start justify-between">
    <div className="flex flex-col gap-1">
      <span className="label">Título</span>
      <span className="font-medium">{cause.title}</span>
    </div>

    <div className="flex items-center gap-2">
      <Button 
        asChild 
        size="icon"
        variant="outline"
        className="size-8"
      >
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
</div> */}