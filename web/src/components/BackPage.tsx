'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export function BackPage(){

  const navigation = useRouter();

  return(
    <Button 
      variant={'ghost'} 
      className="gap-2 pl-0 text-xl font-semibold"
      onClick={navigation.back}
    >
      <ArrowLeft className="size-4 text-green-500"/>

      Voltar
    </Button>
  );
}