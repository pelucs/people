"use client"

import Link from "next/link";

import { api } from "@/api/axios";
import { Cause } from "@/types/cause";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

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
        <div className="mt-16">
          <h1 className="text-2xl font-bold">
            Veja também
          </h1>
        
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {causes ? (
              causes.slice(0,3).map((cause) => (
                <Link 
                  key={cause.id}
                  href={`/causa/${cause.id}`}
                  className="py-4 px-5 flex flex-col gap-5 rounded-md border border-transparent transition-colors hover:border-green-500 bg-white"
                >
                  <div className="flex flex-col gap-1">
                    <span className="label">Título</span>
                    <span className="font-medium">{cause.title}</span>
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