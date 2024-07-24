"use client"

import { api } from "@/api/axios";
import { ptBR } from "date-fns/locale";
import { Cause } from "@/types/cause";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

export function CardCause() {

  const { slug } = useParams<{slug : string }>();

  const [cause, setCause] = useState<Cause>();
  const [copy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    const getCause = async () => {
      try {
        const response = await api.get(`/cause/${slug}`);
        const data = response.data;

        setCause(data);
      } catch(err) {
        console.log(err)
      }
    }

    getCause();
  }, []);

  // Função opara compartilhar
  const share = async (url: string) => {
    const shareData = {
      title: cause?.title,
      url: url,
    };
    
    await navigator.share(shareData)
  }

  // Função para copiar id para área de transferência
  const copyId = (id: string) => {
    if(id){
      navigator.clipboard.writeText(id);

      setCopy(true)
      setTimeout(() => setCopy(false), 2000)
    }
  }

  return(
    <div>
      {cause ? (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 md:p-8 flex flex-col gap-5 rounded-md bg-secondary">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="label">ID da causa</span>
                
                <div className="flex items-center gap-2">
                  <span className="font-medium">{slug}</span>
                  
                  <Button 
                    size="icon" 
                    title="Copiar id"
                    disabled={copy}
                    onClick={() => copyId(cause.id)}
                    className="size-7 text-black bg-zinc-300"
                  >
                    {copy ? (
                      <Check className="size-4"/>
                    ) : (
                      <Copy strokeWidth={1} className="size-3"/>
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                size={"icon"} 
                variant={"secondary"} 
                onClick={() => share(`${window.location.href}`)}
                className="hover:text-green-500"
              >
                <Share2 className="size-4"/>
              </Button>
            </div>

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

            <div className="flex flex-col gap-1">
              <span className="label">Registrada em</span>
              <span className="font-medium">
                {format(new Date(cause.createAt), "dd 'de' MMM, y", { locale: ptBR })}
              </span>
            </div>
          </div>

          <div className="h-fit p-5 md:p-8 flex flex-col gap-5 rounded-md bg-secondary">
            <h1 className="font-bold text-xl leading-tight">
              Entre em contato <br/>
              Seja o herói dessa causa!
            </h1>

            <div className="grid grid-cols-2 gap-4">
              <Button asChild className="flex-1 h-14 bg-green-500 hover:bg-green-600">
                <a target="_blank" href={`https://api.whatsapp.com/send?phone=${
                  cause.contact.replace(/\D/g, '')
                }`}>
                  Contato
                </a>
              </Button>

              <Button asChild className="flex-1 h-14 bg-green-500 hover:bg-green-600">
                <a href={`mailto:${cause.email}`}>
                  Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Skeleton className="h-[405px] rounded-md bg-white"/>
          <Skeleton className="h-48 rounded-md bg-white"/>
        </div>
      )}
    </div>
  );
}