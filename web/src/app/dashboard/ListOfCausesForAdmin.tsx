"use client"

import Link from "next/link";
import Image from "next/image";

import { api } from "@/api/axios";
import { Cause } from "@/types/cause";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { UpdateCauseDialog } from "./UpdateCauseDialog";
import { DeleteCauseDialog } from "./DeleteCauseDialog";
import { useEffect, useState } from "react";
import { Clock, Eye, Handshake, Pencil, Plus, ScanEye, ScanLine } from "lucide-react";
import { isPast } from "date-fns";


export function ListOfCausesForAdmin() {

  const navigation = useRouter();

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

  const handlePublishCause = async (state: boolean, causeId: string) => {
    if(state) {
      await api.put(`/cause/${causeId}/unpublish`)

      toast({
        title: "Esta causa está privada!"
      })

      navigation.refresh();
    } else {
      await api.put(`/cause/${causeId}/publish`)

      toast({
        title: "Esta causa está pública!"
      })

      navigation.refresh();
    }
  }

  const amountPublicCauses = causes.filter(cause => cause.isPublic === true).length;
  const amountPrivateCauses = causes.filter(cause => cause.isPublic === false).length;
  const pastCauses = causes.filter(cause => isPast(new Date(cause.expirationAt)) === true).length;

  return(
    <div className="w-full flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-5">
        <div className="w-full py-4 px-5 flex flex-col gap-2 rounded-md border shadow">
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-muted-foreground">Causas registradas</h1>
            <Handshake className="size-4 text-muted-foreground"/>
          </div>

          <strong className="text-2xl font-bold">
            {causes.length}
          </strong>
        </div>

        <div className="w-full py-4 px-5 flex flex-col gap-2 rounded-md border shadow">
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-muted-foreground">Causas públicas</h1>
            <ScanEye className="size-4 text-muted-foreground"/>
          </div>

          <strong className="text-2xl font-bold">
            {amountPublicCauses}
          </strong>
        </div>

        <div className="w-full py-4 px-5 flex flex-col gap-2 rounded-md border shadow">
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-muted-foreground">Causas privadas</h1>
            <ScanLine className="size-4 text-muted-foreground"/>
          </div>

          <strong className="text-2xl font-bold">
            {amountPrivateCauses}
          </strong>
        </div>

        <div className="w-full py-4 px-5 flex flex-col gap-2 rounded-md border shadow">
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-muted-foreground">Causas expiradas</h1>
            <Clock className="size-4 text-muted-foreground"/>
          </div>

          <strong className="text-2xl font-bold">
            {pastCauses}
          </strong>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          Causas em aberto
        </h1>

        {!loading ? (
          <>
            {causes.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                {causes.map(cause => (
                  <div 
                    key={cause.id} 
                    className="rounded-xl overflow-hidden border shadow group flex flex-col"
                  >
                    <div className="aspect-video overflow-hidden flex items-center justify-start">
                      <Image 
                        width={500}
                        height={500}
                        src={cause.imagesUrl[0]} 
                        alt="" 
                        className="w-full"
                      />
                    </div>

                    <div className="py-4 px-5 space-y-5">
                      <h1 className="text-lg leading-none font-semibold truncate">
                        {cause.title}
                      </h1>

                      <Separator/>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button asChild size="icon" variant="outline">
                            <Link href={`/causa/${cause.id}`}>
                              <Eye className="size-4"/>
                            </Link>
                          </Button>

                          <Button asChild size="icon" variant="outline">
                            <Link href={`/dashboard/editar-causa/${cause.id}`}>
                              <Pencil className="size-4"/>
                            </Link>
                          </Button>

                          {/* <UpdateCauseDialog cause={cause}/> */}
                          <DeleteCauseDialog causeId={cause.id}/>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          Privada
                          
                          <Switch
                            defaultChecked={cause.isPublic}
                            onCheckedChange={() => handlePublishCause(cause.isPublic, cause.id)}
                          />

                          Pública
                        </div>
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