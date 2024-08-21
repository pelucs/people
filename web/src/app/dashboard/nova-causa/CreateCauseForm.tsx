"use client"

import '@uploadcare/react-uploader/core.css';

import clsx from "clsx";
import Image from "next/image";

import { z } from "zod";
import { api } from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "./DatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverPortal } from "@radix-ui/react-popover";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileUploaderRegular, OutputCollectionState } from '@uploadcare/react-uploader';


const formSchema = z.object({
  title: z.string({ message: "Campo obrigatório" }),
  email: z.string({ message: "Campo obrigatório" }).email(),
  contact: z.string({ message: "Campo obrigatório" }),
  location: z.string({ message: "Campo obrigatório" }),
  description: z.string({ message: "Campo obrigatório" })
  .max(500, "Descrição deve conter no máximo 500 caracteres"),
});

type FormTypes = z.infer<typeof formSchema>;

export function CreateCauseForm() {
  
  const [date, setDate] = useState<Date>();
  const [imageUrl, setImagesUrl] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxLengthDescription, setMaxLengthDescription] = useState<string>("");

  const navigation = useRouter();

  const { handleSubmit, register, formState: { errors } } = useForm<FormTypes>({
    resolver: zodResolver(formSchema)
  });

  const handleChangeEvent = (event: OutputCollectionState) => {
    const successFiles = event.successEntries.map(entry => entry.fileInfo);
  
    const validUrls = successFiles
      .map(file => file.cdnUrl)
      .filter((url): url is string => url !== null);
  
    setImagesUrl(validUrls);
  };

  const createCause = async (data: FormTypes) => {
    if(imageUrl.length > 0) {
      setIsLoading(true);

      const { title, description, email, contact, location } = data;

      try {
        const res = await api.post("/cause/create", {
          title,
          description,
          email,
          contact,
          location,
          expirationAt: date,
          imagesUrl: imageUrl,
        })
        
        toast({
          title: res.data.message
        })

        navigation.push(`/causa/${res.data.id}`);
      } catch(err: any) {
        console.log(err)
        toast({
          title: err.message
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Insira uma imagem!"
      })
    }

  }

  return(
    <form 
      onSubmit={handleSubmit(createCause)} 
      className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:rounded-xl"
    >
      <div className="py-5 px-6 rounded-xl border shadow flex flex-col gap-3">
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
          <label className="label">Data de expiração (Opcional)</label>
          
          <DatePicker 
            date={date} 
            setDate={setDate}
          />
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
          {isLoading ? <LoaderCircle className="size-4 animate-spin"/> : "Criar causa"}
        </Button>
      </div>

      <div className="py-5 px-6 rounded-xl border shadow flex flex-col gap-2">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold leading-none  ">Insira uma imagem</h1>

          <FileUploaderRegular
            imgOnly={true}
            multipleMax={1}
            sourceList="local, url"
            onChange={handleChangeEvent}
            useCloudImageEditor={true}
            maxLocalFileSizeBytes={10000000}
            classNameUploader="my-config uc-light"
            pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
          />
        </div>

        {imageUrl ? (
          imageUrl.map(image => (
            <Image
              width={500}
              height={500}
              key={image}
              src={image}
              alt=""
              className="w-full rounded-xl border shadow"
            />
          ))
        ) : (
          <div className="aspect-video border border-dashed border-xl"/>
        )}
      </div>
    </form>
  );
}