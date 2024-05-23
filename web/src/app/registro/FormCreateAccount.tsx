'use client'

import { z } from "zod";
import { api } from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve conter no mínimo 4 caracteres."),
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "Senha deve conter no mínimo 4 caracteres."),
});

type FormTypes = z.infer<typeof formSchema>;

export function FormCreateAccount(){

  const navigation = useRouter();

  const [typeAccount, setTypeAccount] = useState<string>("");

  const { handleSubmit, register, formState: { errors } } = useForm<FormTypes>({
    resolver: zodResolver(formSchema)
  });

  const createUser = async (data: FormTypes) => {
    if(typeAccount.length > 0){
      const { name, email, password } = data;

      await api.post("/register", {
        name,
        email,
        password,
        type: typeAccount,
      })
      .then(() => {
        toast({
          title: "Conta criada",
          description: "Efetue seu login na plataforma"
        });

        navigation.push("/login")
      })
      .catch(err => (
        toast({
          title: err.response.data.message
        })
      ))
    } else {
      toast({
        title: "Selecione o tipo da conta"
      });
    }
  }

  return(
    <form onSubmit={handleSubmit(createUser)} className="w-full max-w-96 mt-4 flex flex-col gap-3">
      <Select onValueChange={setTypeAccount}>
        <SelectTrigger className="w-full max-w-96 h-14 px-5 text-base">
          <SelectValue placeholder="Selecione o tipo da conta"/>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="INSTITUTION">Instituição</SelectItem>
            <SelectItem value="COMMUNITY">Comunidade</SelectItem>
          </SelectGroup>  
        </SelectContent>
      </Select>

      <div className="flex flex-col gap-1">
        <input
          className="input"
          {...register("name")}
          placeholder="Informe o seu nome"
        />

        {errors.name && (
          <span className="leading-none text-xs text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          className="input"
          {...register("email")}
          placeholder="Informe seu email"
        />

        {errors.email && (
          <span className="leading-none text-xs text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="password"
          {...register("password")}
          placeholder="Informe uma senha"
          className="input"
        />

        {errors.password && (
          <span className="leading-none text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button type="submit" className="button">
        Criar Conta
      </Button>
    </form>
  );
}