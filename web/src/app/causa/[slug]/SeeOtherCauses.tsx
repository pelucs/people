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
import { format } from "date-fns";

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
              causes.slice(0,3).map((cause) => (
                <Link 
                  key={cause.id}
                  href={`/causa/${cause.id}`}
                  className="rounded-xl overflow-hidden border hover:border-primary shadow relative
                  transition-colors"
                >
                  <Image 
                    src={example} 
                    alt="Exemplo" 
                    className=""
                  />

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