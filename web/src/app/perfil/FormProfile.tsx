"use client"

import { z } from "zod";
import { api } from "@/api/axios";
import { ptBR } from "date-fns/locale";
import { User } from "@/types/user";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface FormProfileProps {
  userId: string;
}

const formSchema = z.object({
  name: z.string(),
  contact: z.string(),
  address: z.string().max(8, "Informe apenas números"),
});

type FormTypes = z.infer<typeof formSchema>;

export function FormProfile({ userId }: FormProfileProps) {

  const [user, setUser] = useState<User>();
  const [typeAccount, setTypeAccount] = useState<string>("");

  const navigation = useRouter();

  const { handleSubmit, register, formState: { errors } } = useForm<FormTypes>({
    resolver: zodResolver(formSchema)
  });

  // Recebendo as informações do usuário
  useEffect(() => {
    const getInfoUser = async () => {
      await api.get(`/user/${userId}`)
      .then(res => {
        const data = res.data;
        setUser(data);
      });
    }

    getInfoUser();
  }, []);

  // Função que irá atualizar as informações do usuário
  const handleUpdateInfoUser = async (data: FormTypes) => {
    const { name, address, contact } = data;

    await api.put(`/user/${userId}/update`, {
      name,
      address,
      contact,
      type: typeAccount
    })
    .then(res => {
      const expireTokenInSeconds = 60 * 60 * 24 * 30;
      document.cookie = `token=${res.data}; Path=/; max-age=${expireTokenInSeconds};`;

      toast({
        title: "Alterações salvas com sucesso"
      });

      navigation.refresh();
    })
  }

  return(
    <div>
      {user ? (
        <div>
          <span className="text-muted-foreground">
            Registrado em: {format(new Date(user.createAt).getTime(), "dd 'de' MMM, y", { locale: ptBR })}
          </span>
          
          <form onSubmit={handleSubmit(handleUpdateInfoUser)} className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="w-full flex flex-col gap-3">
              <Select onValueChange={setTypeAccount} defaultValue={user.type}>
                <SelectTrigger className="h-14 px-5 text-base">
                  <SelectValue placeholder="Selecione o tipo da conta"/>
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="INSTITUTION">Instituição</SelectItem>
                    <SelectItem value="COMMUNITY">Comunidade</SelectItem>
                  </SelectGroup>  
                </SelectContent>
              </Select>

              <input
                defaultValue={user.name}
                {...register("name")}
                placeholder="Informe o seu nome"
                className="input"
              />
              
              <input
                disabled={true}
                defaultValue={user.email}
                placeholder="Informe seu email"
                className="input opacity-60"
              />
            </div>

            <div className="w-full h-fit flex flex-col gap-3">
              <input
                {...register("contact")}
                defaultValue={user.contact}
                placeholder="Informe seu contato"
                className="input"
              />

              <input
                maxLength={8}
                type="number"
                className="input"
                {...register("address")}
                defaultValue={user.address}
                placeholder="Informe seu CEP"
              />

              <Button className="w-full button">
                Salvar alterações
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="w-full flex flex-col gap-3">
            <Skeleton className="h-14 bg-background"/>
            <Skeleton className="h-14 bg-background"/>
            <Skeleton className="h-14 bg-background"/>
          </div>

          <div className="w-full h-fit flex flex-col gap-3">
            <Skeleton className="h-14 bg-background"/>
            <Skeleton className="h-14 bg-background"/>
            <Skeleton className="h-14 bg-background"/>
          </div>
        </div>
      )}
    </div>
  );
}