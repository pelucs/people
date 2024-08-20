"use client"

import Link from "next/link";
import Image from "next/image";
import example from "@/assets/example.jpg";

import { api } from "@/api/axios";
import { Cause } from "@/types/cause";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { format, subDays } from "date-fns";

export function SeeOtherCauses() {
  
  const { slug } = useParams<{slug : string }>();
  
  const [causes, setCauses] = useState<Cause[]>([]);

  useEffect(() => {
    const getCauses = async () => {
      try {
        const response = await api.get(`/causes`);
        const data: Cause[] = response.data;

        const filteredCauses = data.filter(cause => cause.id !== slug);

        setCauses(filteredCauses);
      } catch(err) {
        console.log(err)
      }
    }

    getCauses();
  }, []);
  
  return(
    <div>
      {causes.length > 0 ? (
        <div className="space-y-5">
          <h1 className="text-2xl font-bold">
            Veja também
          </h1>
        
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {causes ? (
              causes.slice(0, 4).map((cause) => (
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
                      alt="Exemplo" 
                      className=""
                    />
                  </div>

                  <div className="py-5 px-6 flex flex-col gap-5 flex-grow">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <h1 className="text-lg leading-none font-semibold">
                          {cause.title}
                        </h1>

                        <p className="text-sm text-muted-foreground leading-tight">
                          {cause.description}
                        </p>
                      </div>

                      <div>
                        <div>
                          <span className="text-xs text-muted-foreground">Registrada em</span>
                          <p className="text-sm">
                            {format(new Date(cause.createAt), "dd 'de' MMM, y", { locale: ptBR })}
                          </p>
                        </div>

                        {cause.expirationAt && (
                          <div>
                            <span className="text-xs text-muted-foreground">Expira em</span>
                            <p className="text-sm">
                              {subDays(new Date(cause.expirationAt), new Date().getDate()).getDate()} dias
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="px-6 pb-5 mt-auto flex items-center gap-2 text-primary underline">
                    Ver mais informações

                    <ChevronRight className="size-4"/>
                  </span>
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
        <div/>
      )}
    </div>
  );
}