"use client"

import '@uploadcare/react-uploader/core.css';

import clsx from "clsx";
import Image from "next/image";

import { z } from "zod";
import { api } from "@/api/axios";
import { User } from '@/types/user';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { FileUploaderRegular, OutputCollectionState } from '@uploadcare/react-uploader';

interface CreateCauseFormProps {
  user: User;
}

const formSchema = z.object({
  title: z.string({ message: "Campo obrigatório" }),
  email: z.string({ message: "Campo obrigatório" }).email(),
  contact: z.string({ message: "Campo obrigatório" }),
  location: z.string({ message: "Campo obrigatório" }),
  description: z.string({ message: "Campo obrigatório" })
  .max(500, "Descrição deve conter no máximo 500 caracteres"),
});

type FormTypes = z.infer<typeof formSchema>;

export function CreateCauseForm({ user }: CreateCauseFormProps) {
  
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
    if(user.permissions.includes("create")) {
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
          title: "Insira uma imagem"
        })
      }
    } else {
      toast({
        title: "Permissão negada",
        description: "Você não tem permissão para criar uma nova causa!"
      })
    }
  }

  return(
    <form 
      onSubmit={handleSubmit(createCause)} 
      className="mt-5 flex flex-col-reverse md:grid md:grid-cols-2 gap-5 md:rounded-xl"
    >
      <div className="py-5 px-6 rounded-xl border shadow flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="label">Título</label>
          <input
            required 
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
            required 
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
            required 
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
            required 
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
            required
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