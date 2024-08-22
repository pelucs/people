"use client"

import Image from "next/image";

import { api } from "@/api/axios";
import { ptBR } from "date-fns/locale";
import { Cause } from "@/types/cause";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import { useParams } from "next/navigation";
import { format, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { BellPlus, Share2, ShieldCheck } from "lucide-react";

interface CardCauseProps {
  user: { id: string, name: string } | null
} 

export function CardCause({ user }: CardCauseProps) {

  const { slug } = useParams<{slug : string }>();
  const [cause, setCause] = useState<Cause>();

  useEffect(() => {
    const getCause = async () => {
      try {
        const response = await api.get(`/cause/${slug}`);
        const data: Cause = response.data;

        setCause(data);
        document.title = "Socio - ".concat(data.title);
      } catch(err) {
        console.log(err)
      }
    }

    getCause();
  }, []);

  // Função para compartilhar
  const share = async (url: string) => {
    const shareData = {
      title: cause?.title,
      url: url,
    };
    
    await navigator.share(shareData);
  }

  return(
    <div>
      {cause ? (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="py-3 px-4 md:hidden flex items-center gap-2 rounded-xl font-semibold text-sm text-primary bg-primary/10">
            <ShieldCheck className="w-4 text-primary"/>

            Esta causa foi verificada!
          </div>

          <div className="sticky top-10 space-y-5">
            <Image 
              alt=""
              width={500}
              height={500}
              src={cause.imagesUrl[0]} 
              className="w-full rounded-xl"
            />

            <a 
              target="_blank"
              href="https://www.instagram.com/socioambiental_cg/" 
              className="w-full md:w-fit py-3 px-4 flex items-center font-medium text-sm gap-2 rounded-lg border shadow
              bg-primary text-background"
            >
              <BellPlus className="size-4 animate-bounce"/>

              Siga-nos no instagram para saber mais novidades
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <div className="py-3 px-4 hidden md:flex items-center gap-2 rounded-md font-semibold text-sm text-primary bg-primary/10">
              <ShieldCheck className="w-4 text-primary"/>

              Esta causa foi verificada!
            </div>

            <div className="p-5 md:p-8 flex flex-col gap-4 rounded-xl bg-secondary border shadow">
              <div className="flex items-start justify-between gap-5">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold leading-tight">
                    {cause.title}
                  </h1>

                  {user && (
                    <span className="w-fit text-xs py-1 px-2 rounded text-primary bg-primary/10">
                      {cause.isPublic ? "Pública" : "Privada"}
                    </span>
                  )}
                </div>
                
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={() => share(`${window.location.href}`)}
                >
                  <Share2 className="size-4"/>

                  Compartilhar
                </Button>
              </div>

              <div className="flex flex-col gap-1">
                <span className="label">Descrição</span>
                <p className="whitespace-pre-line font-medium leading-tight">{cause.description}</p>
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

              {cause.expirationAt && (
                <div className="flex flex-col gap-1">
                  <span className="label">Expira em</span>
                  <p className="font-medium">
                    {subDays(new Date(cause.expirationAt), new Date().getDate()).getDate()} dias
                  </p>
                </div>
              )}
            </div>

            <div className="h-fit p-5 md:p-8 flex flex-col gap-5 rounded-xl bg-secondary border shadow">
              <h1 className="font-bold text-xl leading-tight">
                Entre em contato <br/>
                Seja o herói dessa causa!
              </h1>

              <div className="grid grid-cols-2 gap-4">
                <Button asChild>
                  <a target="_blank" href={`https://api.whatsapp.com/send?phone=${
                    cause.contact.replace(/\D/g, '')
                  }`}>
                    Contato
                  </a>
                </Button>

                <Button asChild>
                  <a href={`mailto:${cause.email}`}>
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading/>
      )}
    </div>
  );
}