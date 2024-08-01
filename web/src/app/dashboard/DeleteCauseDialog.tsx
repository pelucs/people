"use client"

import { api } from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogOverlay, 
  DialogPortal, 
  DialogTrigger 
} from "@/components/ui/dialog";

interface DeleteCauseDialog {
  causeId: string;
}

export function DeleteCauseDialog({ causeId }: DeleteCauseDialog) {

  const navigation = useRouter();

  const deleteCause = async () => {
    await api.delete(`/cause/${causeId}`)
    .then(res => {
      toast({
        title: "Causa deletada com sucesso"
      });

      window.location.reload();
    })
    .catch(err => {
      toast({
        title: err.message
      })
    })
  }

  return(
    <Dialog>
      <Button 
        asChild 
        size="icon"
        variant="outline"
      >
        <DialogTrigger>
          <Trash className="size-4 text-red-500"/>
        </DialogTrigger>
      </Button>

      <DialogPortal>
        <DialogOverlay/>

        <DialogContent>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold leading-none">
              Deseja realmente excluir <br/> 
              essa causa?
            </h1>

            <span>#ID: {causeId}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant={"destructive"} 
              onClick={deleteCause}
              className="w-full max-w-96 h-14 rounded-md"
            >
              Excluir
            </Button>

            <Button asChild className="w-full max-w-96 h-14 rounded-md bg-zinc-200 hover:bg-zinc-300 text-black">
              <DialogClose>
                Cancelar
              </DialogClose>
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}