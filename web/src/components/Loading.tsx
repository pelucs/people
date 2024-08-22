import { LoaderCircle } from "lucide-react";

export function Loading() {
  return(
    <div className="w-full h-[70vh] text-2xl font-bold flex items-center justify-center gap-2">
      <LoaderCircle className="size-5 animate-spin"/>
      
      Carregando...
    </div>
  );
}