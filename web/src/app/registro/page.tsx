import Link from "next/link";

import { Logo } from "@/components/Logo";
import { LogIn } from "lucide-react";
import { FormCreateAccount } from "./FormCreateAccount";

export default () => {
  return(
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1120px] p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 
      md:border md:rounded-md md:bg-[#F0EFF5]">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-10 md:gap-20">
          <Logo/>

          <div>
            <h1 className="text-3xl font-bold">
              Cadastro
            </h1>

            <p className="text-muted-foreground">
              Crie sua conta, entre na plataforma e seja o herói de alguém!
            </p>

            <Link href="/login" className="mt-5 font-semibold hidden md:flex items-center justify-start gap-2">
              <LogIn className="size-4 text-green-500"/>

              Já possui uma conta?

              <span className="text-green-500 underline">Entre aqui</span>
            </Link>
          </div>

          <p className="hidden md:block text-sm text-zinc-400">
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

        <div className="flex flex-col justify-center">
          <span className="text-muted-foreground text-center md:text-left">Preencha todos os campos corretamente.</span>

          <FormCreateAccount/>
        </div>

        <Link href="/" className="font-semibold flex md:hidden items-center justify-center gap-2">
          <LogIn className="size-4 text-green-500"/>

          Já possui uma conta?

          <span className="text-green-500 underline">Entre aqui</span>
        </Link>
      </div>
    </div>
  );
}