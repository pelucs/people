"use client"

import clsx from "clsx";

import { z } from "zod";
import { api } from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { DatePicker } from "./DatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { MediaPicker } from "./MediaPicker";
import { PopoverPortal } from "@radix-ui/react-popover";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";

interface CreateCauseFormProps {
  userId: string;
}

const formSchema = z.object({
  title: z.string({ message: "Campo obrigatório" }),
  email: z.string({ message: "Capo obrigatório" }).email(),
  contact: z.string({ message: "Campo obrigatório" }),
  location: z.string({ message: "Campo obrigatório" }),
  description: z.string({ message: "Campo obrigatório" })
  .max(500, "Descrição deve conter no máximo 500 caracteres"),
});

type FormTypes = z.infer<typeof formSchema>;

export function CreateCauseForm({ userId }: CreateCauseFormProps) {

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 10),
  });

  const [imageBase64, setImageBase64] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxLengthDescription, setMaxLengthDescription] = useState<string>("");

  const navigation = useRouter();

  const { handleSubmit, register, formState: { errors } } = useForm<FormTypes>({
    resolver: zodResolver(formSchema)
  });

  const createCause = async (data: FormTypes) => {
    
    const { title, description, email, contact, location } = data;

    try {
      console.log('API Key:', process.env.NEXT_PUBLIC_IMAGE_DB_API_KEY);

      const response = await axios.post('https://api.imgbb.com/1/upload', null, {
        params: {
          key: process.env.NEXT_PUBLIC_IMAGE_DB_API_KEY,
          image: imageBase64,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Image uploaded successfully:', response.data.data.url);
    } catch (error: any) {
        if (error.response) {
          // O servidor respondeu com um status diferente de 2xx
          console.error('Error response:', error.response.data);
        } else if (error.request) {
          // A solicitação foi feita, mas nenhuma resposta foi recebida
          console.error('Error request:', error.request);
        } else {
          // Algo aconteceu ao configurar a solicitação
          console.error('Error message:', error.message);
        }
    }

    // await api.post("/cause/create", {
    //   userId,
    //   title,
    //   description,
    //   email,
    //   contact,
    //   location,
    // })
    // .then(res => {
    //   toast({
    //     title: res.data.message
    //   })

    //   navigation.push(`/causa/${res.data.id}`);
    // })
    // .catch(err => {
    //   toast({
    //     title: err.message
    //   });
    // })
  }

  return(
    <form 
      onSubmit={handleSubmit(createCause)} 
      className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-8 md:rounded-xl"
    >
      <MediaPicker imageBase64={imageBase64} setImageBase64={setImageBase64}/>

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
          <div className="flex items-center gap-2">
            <label htmlFor="location" className="label">
              Datas
            </label>

            <Popover>
              <PopoverTrigger>
                <AlertCircle className="size-4 text-muted-foreground"/>
              </PopoverTrigger>

              <PopoverPortal>
                <PopoverContent align="center" className="py-3 px-4 rounded-md bg-green-50 text-xs leading-none">
                  As datas são usadas para definir a expiração da causa
                </PopoverContent>
              </PopoverPortal>
            </Popover>
          </div>
          
          <DatePicker date={date} setDate={setDate}/>

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

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label htmlFor="title" className="label">
              Descrição
            </label>

            <span 
              className={clsx("text-xs text-muted-foreground", {
                "text-yellow-500": maxLengthDescription.length >= 450 && maxLengthDescription.length < 480,
                "text-red-500": maxLengthDescription.length >= 480,
              })}
            >
              {maxLengthDescription.length}/500
            </span>
          </div>

          <textarea 
            id="title"
            maxLength={500}
            {...register("description")}
            onChange={e => setMaxLengthDescription(e.target.value)}
            placeholder="Escreva uma descrição"
            className="h-60 py-4 px-5 rounded-md border"
          ></textarea>

          {errors.description && (
            <span className="text-sm text-red-500">{errors.description.message}</span>
          )}
        </div>

        <Button 
          type="submit"
          disabled={isLoading}
          className="disabled:opacity-90"
        >
          {isLoading ? <LoaderCircle className="size-4"/> : "Criar causa"}
        </Button>
      </div>
    </form>
  );
}