"use client"

import Image from "next/image";

import { api } from "@/api/axios";
import { ptBR } from "date-fns/locale";
import { Cause } from "@/types/cause";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Loading } from "@/components/Loading";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, BellPlus, Frown, Share2, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface CardCauseProps {
  user: { id: string, name: string } | null
} 

export function CardCause({ user }: CardCauseProps) {

  const navigation = useRouter();

  const { slug } = useParams<{slug : string }>();
  const [cause, setCause] = useState<Cause>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    const getCause = async () => {
      try {
        const response = await api.get(`/cause/${slug}`);
        const data: Cause = response.data;

        setCause(data);
        document.title = "Socio - ".concat(data.title);
      } catch(err) {
        console.log(err)
      } finally {
        setIsLoading(false);
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
      {isLoading ? (
        <Loading/>
      ) : (
        (cause && (cause.isPublic || user)) ? (
          <div className="space-y-5">
            <h1 className="text-xl md:text-2xl font-bold">Abrace essa causa!</h1>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:hidden flex items-center gap-2">
                <div className="flex-1 py-2 px-4 flex items-center gap-2 rounded-md font-semibold text-sm text-primary bg-primary/10">
                  <ShieldCheck className="w-4 text-primary"/>
    
                  Esta causa foi verificada!
                </div>
    
                <Button 
                  size="icon" 
                  className="gap-2 md:hidden flex"
                  onClick={() => share(`${window.location.href}`)}
                >
                  <Share2 className="size-4"/>
                </Button>
              </div>
    
              <div className="space-y-5">
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
                  className="w-full md:w-fit py-3 px-4 flex items-center justify-center md:justify-start 
                  font-medium text-sm gap-2 rounded-lg border bg-primary text-background"
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
    
                <div className="p-5 md:p-8 flex flex-col gap-4 rounded-xl bg-secondary border">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-xl md:text-2xl font-bold leading-tight">
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
                      className="gap-2 hidden md:flex"
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
                </div>
    
                <div className="h-fit p-5 md:p-8 flex flex-col gap-5 rounded-xl bg-secondary border">
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
          </div>
        ) : (
          <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-4">
              <Frown className="size-6"/>
              
              <h1 className="text-2xl font-bold">Esta causa não existe</h1>
            </div>

            <Button
              asChild
              className="gap-1"
            >
              <Link href="/">
                <ArrowLeft className="size-4"/>

                Voltar ao início
              </Link>
            </Button>
          </div>
        )
      )}
    </div>
  );
}