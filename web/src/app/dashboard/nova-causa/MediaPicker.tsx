"use client"

import axios from "axios";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";
import { CloudUpload, Upload } from "lucide-react";

interface MediaPickerProps {
  imageBase64: string;
  setImageBase64: (imageBase64: string) => void;
}

export function MediaPicker({ imageBase64, setImageBase64 }: MediaPickerProps) {

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return(
    <div>
      <div 
        className="aspect-video flex items-center justify-center border rounded-xl border-dashed group relative overflow-hidden"
      >
        {imageBase64 && (
          <Image 
            alt="" 
            width={1920} 
            height={1080} 
            src={imageBase64} 
            className="w-full"
          />
        )}
        
        <div className={cn("w-full h-full flex items-center justify-center inset-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all", {
          "opacity-0 group-hover:opacity-100 group-hover:bg-black/60": imageBase64,
        })}>
          <input 
            id="file" 
            type="file"
            className="sr-only"
            onChange={handleImageUpload}
            accept="image/png, image/jpeg, image/jpg" 
          />

          <div className={cn("flex flex-col justify-center items-center gap-4", {
            "text-white": imageBase64,
            "text-muted-foreground": !imageBase64,
          })}>
            <h1 className="flex items-center justify-center flex-col gap-2">
              <CloudUpload className="size-8"/>

              Carregue um arquivo do seu computador
            </h1>

            <Button asChild className="gap-2 cursor-pointer">
              <label htmlFor="file">
                <Upload className="size-4"/>

                Carregar imagem
              </label>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}