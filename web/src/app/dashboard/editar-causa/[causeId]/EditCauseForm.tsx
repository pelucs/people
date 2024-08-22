"use client"

import '@uploadcare/react-uploader/core.css';

import clsx from "clsx";
import Image from "next/image";

import { z } from "zod";
import { api } from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import { Cause } from '@/types/cause';
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { DatePicker } from '../../nova-causa/DatePicker';
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FileUploaderRegular, OutputCollectionState } from '@uploadcare/react-uploader';

const formSchema = z.object({
  title: z.string({ message: "Campo obrigatório" }).nullish(),
  email: z.string({ message: "Campo obrigatório" }).nullish(),
  contact: z.string({ message: "Campo obrigatório" }).nullish(),
  location: z.string({ message: "Campo obrigatório" }).nullish(),
  description: z.string({ message: "Campo obrigatório" })
  .max(500, "Descrição deve conter no máximo 500 caracteres").nullish(),
});

type FormTypes = z.infer<typeof formSchema>;

export function EditCauseForm() {

  const navigation = useRouter();

  const { causeId } = useParams<{ causeId: string }>();
  
  const [date, setDate] = useState<Date>();
  const [imageUrl, setImagesUrl] = useState<string[]>([]);

  const [cause, setCause] = useState<Cause>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxLengthDescription, setMaxLengthDescription] = useState<string>("");

  useEffect(() => {
    const getCause = async () => {
      try {
        const response = await api.get(`/cause/${causeId}`);
        const data: Cause = response.data;

        setCause(data);

        if(data) {
          setImagesUrl(data.imagesUrl)
        }
      } catch(err) {
        console.log(err)
      }
    }

    getCause();
  }, []);

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

  const editCause = async (data: FormTypes) => {
    setIsLoading(true);
    
    try {
      await api.put(`/cause/${causeId}`, {
        email: data.email,
        contact: data.contact,
        title: data.title,
        description: data.description,
        location: data.location,
        imagesUrl: imageUrl,
      })

      toast({
        title: "Alterações salvas!"
      })

      navigation.push(`/causa/${causeId}`);
    } catch(err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }

  return(
    <div className="mt-5 grid grid-cols-2 gap-5">
      <form 
        onSubmit={handleSubmit(editCause)} 
        className="py-5 px-6 border shadow rounded-xl space-y-3"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="label">Título</label>
          <input 
            id="title"
            className="input"
            placeholder="Informe o título"
            defaultValue={cause?.title}
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
            defaultValue={cause?.location}
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
            defaultValue={cause?.contact}
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
            defaultValue={cause?.email}
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
            defaultValue={cause?.description}
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
          className="w-40 disabled:opacity-90"
        >
          {isLoading ? <LoaderCircle className="size-4 animate-spin"/> : "Salvar alterações"}
        </Button>
      </form>

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
    </div>
  );
}