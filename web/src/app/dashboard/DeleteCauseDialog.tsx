"use client"

import { api } from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Hash, LoaderCircle, Trash } from "lucide-react";
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogOverlay, 
  DialogPortal, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

interface DeleteCauseDialog {
  causeId: string;
}

export function DeleteCauseDialog({ causeId }: DeleteCauseDialog) {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteCause = async () => {
    setIsLoading(true);

    try {
      await api.delete(`/cause/${causeId}`);

      toast({
        title: "Causa deletada com sucesso"
      });

      window.location.reload();
    } catch(err: any) {
      toast({
        title: err.message
      })
    } finally {
      setIsLoading(false);
    }
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

        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              Deseja realmente excluir <br/> 
              essa causa?
            </DialogTitle>

            <DialogDescription className="w-fit text-xs flex items-center gap-1 py-1 px-2 rounded bg-secondary">
              <Hash className="size-3"/>
              
              {causeId}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant={"destructive"} 
              onClick={deleteCause}
              disabled={isLoading}
              className="w-full max-w-96 rounded-md disabled:opacity-50"
            >
              { isLoading ? <LoaderCircle className="size-4 animate-spin"/> : "Excluir" }
            </Button>

            <Button asChild className="w-full max-w-96 rounded-md bg-zinc-200 hover:bg-zinc-300 text-black">
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