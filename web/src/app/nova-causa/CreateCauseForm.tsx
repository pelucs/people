"use client"

import { z } from "zod";
import { api } from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface CreateCauseFormProps {
  userId: string;
}

const formSchema = z.object({
  title: z.string().nonempty("Campo obrigatório"),
  email: z.string().email("Email inválido"),
  contact: z.string().nonempty("Campo obrigatório"),
  location: z.string().nonempty("Campo obrigatório"),
  description: z.string().max(500, "Descrição deve conter no máximo 500 caracteres").nonempty("Campo obrigatório"),
});

type FormTypes = z.infer<typeof formSchema>;

export function CreateCauseForm({ userId }: CreateCauseFormProps) {

  const navigation = useRouter();

  const { handleSubmit, register, formState: { errors } } = useForm<FormTypes>({
    resolver: zodResolver(formSchema)
  });

  const createCause = async (data: FormTypes) => {
    const { title, description, email, contact, location } = data;

    await api.post("/cause/create", {
      userId,
      title,
      description,
      email,
      contact,
      location,
    })
    .then(res => {
      toast({
        title: res.data.message
      })

      navigation.push(`/causa/${res.data.id}`);
    })
    .catch(err => {
      toast({
        title: err.message
      })
    })
  }

  return(
    <form 
      onSubmit={handleSubmit(createCause)} 
      className="mt-5 md:p-8 grid grid-cols-1 md:grid-cols-2 md:gap-5 md:rounded-md md:bg-[#F0EFF5]"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="label">Título</label>
          <input 
            id="title"
            placeholder="Informe o título"
            className="input"
            {...register("title")}
          />

          {errors.title && (
            <span className="text-sm text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="label">Localização</label>
          
          <input 
            id="location"
            placeholder="Informe a cidade"
            className="input"
            {...register("location")}
          />

          {errors.location && (
            <span className="text-sm text-red-500">{errors.location.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="contact" className="label">Contato</label>
          <input 
            id="contact"
            placeholder="Informe o seu contato"
            className="input"
            {...register("contact")}
          />

          {errors.contact && (
            <span className="text-sm text-red-500">{errors.contact.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="label">Email</label>
          <input 
            id="email"
            placeholder="Informe o seu email"
            className="input"
            {...register("email")}
          />

          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mt-5">
          <Button className="hidden md:flex button">
            Criar Causa
          </Button>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label htmlFor="title" className="label">
              Descrição
            </label>

            <span className="text-xs text-muted-foreground">0/500</span>
          </div>

          <textarea 
            id="title"
            maxLength={500}
            {...register("description")}
            placeholder="Escreva uma descrição"
            className="h-60 py-4 px-5 rounded-md border"
          ></textarea>

          {errors.description && (
            <span className="text-sm text-red-500">{errors.description.message}</span>
          )}
        </div>
      </div>

      <div className="mt-5 md:hidden">
        <Button type="submit" className="button">
          Criar Causa
        </Button>
      </div>
    </form>
  );
}