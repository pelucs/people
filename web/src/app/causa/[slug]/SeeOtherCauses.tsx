"use client"

import Link from "next/link";
import Image from "next/image";

import { api } from "@/api/axios";
import { ptBR } from "date-fns/locale";
import { Cause } from "@/types/cause";
import { format } from "date-fns";
import { Loading } from "@/components/Loading";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function SeeOtherCauses() {
  
  const { slug } = useParams<{slug : string }>();
  
  const [causes, setCauses] = useState<Cause[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    const getCauses = async () => {
      try {
        const response = await api.get(`/causes/public`);
        const data: Cause[] = response.data;

        const filteredCauses = data.filter(cause => cause.id !== slug);

        setCauses(filteredCauses);
      } catch(err) {
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    }

    getCauses();
  }, []);
  
  return(
    <div>
      {(causes || !isLoading) ? (
        <div className="space-y-5">
          <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
            Veja também
          </h1>
        
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {causes ? (
              causes.slice(0, 4).map((cause) => (
                <Link 
                  key={cause.id}
                  href={`/causa/${cause.id}`}
                  className="rounded-md md:rounded-xl overflow-hidden border hover:border-primary relative
                  transition-colors bg-secondary"
                >
                  <div className="aspect-video overflow-hidden flex items-center justify-start">
                    <Image 
                      width={500}
                      height={500}
                      src={cause.imagesUrl[0]} 
                      alt={cause.title}
                      className="w-full"
                    />
                  </div>

                  <div className="p-3 md:py-5 md:px-6 space-y-2 md:space-y-5">
                    <div className="flex flex-col gap-1">
                      <h1 className="leading-tight text-sm md:text-lg font-semibold">
                        {cause.title.substring(0, 30).concat("...")}
                      </h1>

                      <p className="hidden md:block text-sm text-muted-foreground leading-tight">
                        {cause.description.substring(0, 100).concat("...")}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-muted-foreground">Localização</span>

                      <p className="text-xs md:text-base font-medium leading-tight">
                        {cause.location}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-muted-foreground">Registrada em</span>

                      <p className="text-xs md:text-base font-medium leading-tight">
                        {format(new Date(cause.createAt), "dd 'de' MMM, y", { locale: ptBR })}
                      </p>
                    </div>

                    <span className="text-xs md:text-base flex items-center gap-1 text-primary underline font-semibold">
                      Saiba mais

                      <ChevronRight className="size-3 md:size-4"/>
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <Skeleton className="h-[405px] rounded-md bg-white"/>
                <Skeleton className="h-48 rounded-md bg-white"/>
                <Skeleton className="h-48 rounded-md bg-white"/>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading/>
      )}
    </div>
  );
}