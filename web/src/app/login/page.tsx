'use client'

import img from '@/assets/img.png';
import Image from "next/image";

import { z } from "zod";
import { api } from "@/api/axios";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';

const formSchema = z.object({
  email: z.string().email("Email incorreto."),
  password: z.string().min(4, "Senha deve conter no mínimo 4 caracteres."),
});

type FormTypes = z.infer<typeof formSchema>;

export default () => {

  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, register, formState: { errors } } = useForm<FormTypes>({
    resolver: zodResolver(formSchema)
  });

  const login = async (data: FormTypes) => {
    setIsLoading(true);

    const { email, password } = data;

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.data;
      const expireTokenInSeconds = 60 * 60 * 24 * 30;

      document.cookie = `token=${token}; Path=/; max-age=${expireTokenInSeconds};` 
      window.location.pathname = "/dashboard";
    } catch(err: unknown) {
      const error = err as AxiosError;
      const errorData = error.response?.data as { message: string }

      toast({
        title: errorData.message
      })
      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen md:grid md:grid-cols-2">
      <div className="h-full p-10 flex items-center justify-center">
        <div className="w-full max-w-sm space-y-20 flex flex-col items-center md:items-start">
          <Logo/>

          <div className="w-full">
            <h1 className="text-center md:text-left text-3xl font-bold">
              Faça seu login
            </h1>

            <form onSubmit={handleSubmit(login)} className="mt-5 flex flex-col gap-3">
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
                <div className="relative">
                  <input
                    type={visiblePassword ? "text" : "password"}
                    className="w-full pr-6 input"
                    {...register("password")}
                    placeholder="Informe sua senha"
                  />

                  <Button 
                    size="icon" 
                    type="button"
                    variant="ghost" 
                    onClick={() => setVisiblePassword(!visiblePassword)}
                    className="size-6 absolute top-[10px] right-2"
                  >
                    {visiblePassword ? (
                      <EyeOff className="size-4"/>
                    ) : (
                      <Eye className="size-4"/>
                    )}
                  </Button>
                </div>
                
                {errors.password && (
                  <span className="leading-none text-xs text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="button"
              >
                {isLoading ? <LoaderCircle className="size-4 animate-spin"/> : "Efetuar Login"}
              </Button>
            </form>
          </div>

          <p className="text-sm text-zinc-400">
            Desenvolvido por 
            
            <a 
              href="https://instagram.com/pdlucs" 
              target="_blank"
              className="underline ml-1"
            >
              @pdlucs
            </a>
          </p>
        </div>
      </div>
        

      <div className="hidden md:flex overflow-hidden">
        <Image 
          src={img} 
          alt="Ilustração Criança"
          className="w-full"
        />
      </div>
    </div>
  );
}
