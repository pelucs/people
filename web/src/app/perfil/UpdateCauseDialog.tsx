"use client"

import { z } from "zod";
import { api } from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import { Cause } from "@/types/cause";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog, 
  DialogPortal, 
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import clsx from "clsx";

interface UpdateCauseDialogProps {
  cause: Cause;
}

const formSchema = z.object({
  title: z.string().nonempty("Campo obrigatório"),
  email: z.string().email("Email inválido"),
  contact: z.string().nonempty("Campo obrigatório"),
  location: z.string().nonempty("Campo obrigatório"),
  description: z.string().max(500, "Descrição deve conter no máximo 500 caracteres").nonempty("Campo obrigatório"),
});

type FormTypes = z.infer<typeof formSchema>;

export function UpdateCauseDialog({ cause }: UpdateCauseDialogProps) {

  const [maxLengthDescription, setMaxLengthDescription] = useState<string>(cause.description);

  const navigation = useRouter();

  const { handleSubmit, register, formState: { errors } } = useForm<FormTypes>({
    resolver: zodResolver(formSchema)
  });
  
  const updateCause = async (data: FormTypes) => {
    await api.put(`/cause/${cause.id}`, {
      email: data.email,
      contact: data.contact,
      title: data.title,
      description: data.description,
      location: data.location,
    })
    .then(res => {
      toast({
        title: "Alterações salvas com sucesso"
      })

      navigation.push(`/causa/${cause.id}`);
    })
    .catch(err => {
      toast({
        title: err.message
      });
    })
  }
  
  return(
    <Dialog>
      <Button asChild size={"icon"} variant={"outline"}>
        <DialogTrigger>
          <Pencil className="size-4"/>
        </DialogTrigger>
      </Button>

      <DialogPortal>
        <DialogOverlay/>

        <DialogContent className="max-w-2xl flex flex-col gap-5">
          <div>
            <h1 className="text-2xl font-bold">Editar causa</h1>
            <span>
              #ID: {cause.id}
            </span>
          </div>

          <Separator orientation="horizontal" className="h-[1px] bg-zinc-200"/>
            
          <form onSubmit={handleSubmit(updateCause)}>
            <div className="w-full h-fit flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  {...register("title")}
                  defaultValue={cause.title}
                  placeholder="Informe o título"
                  className="input"
                />

                <input
                  {...register("location")}
                  defaultValue={cause.location}
                  placeholder="Informe a localização"
                  className="input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  {...register("contact")}
                  defaultValue={cause.contact}
                  placeholder="Informe o contato"
                  className="input"
                />

                <input
                  {...register("email")}
                  className="input"
                  defaultValue={cause.email}
                  placeholder="Informe o email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span 
                  className={clsx("text-xs text-muted-foreground", {
                    "text-yellow-500": maxLengthDescription.length >= 450 && maxLengthDescription.length < 480,
                    "text-red-500": maxLengthDescription.length >= 480,
                  })}
                >
                  {maxLengthDescription.length}/500
                </span>

                <textarea 
                  maxLength={500}
                  {...register("description")}
                  defaultValue={cause.description}
                  onChange={e => setMaxLengthDescription(e.target.value)}
                  placeholder="Escreva uma descrição"
                  className="h-40 py-4 px-5 rounded-md border resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button type="submit" className="w-full button">
                  Salvar alterações
                </Button>

                <Button asChild className="w-full max-w-96 h-14 rounded-md text-black bg-zinc-200 hover:bg-zinc-300">
                  <DialogClose>
                    Cancelar
                  </DialogClose>
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}