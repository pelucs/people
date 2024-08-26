"use client"

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LoaderCircle, UserPlus } from "lucide-react";
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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { api } from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

const permissions = [
  { value: "create", label: "Criar" },
  { value: "edit", label: "Editar" },
  { value: "delete", label: "Deletar" },
]

const formSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }),
  email: z.string({ message: "Campo obrigatório" }).email(),
  password: z.string({ message: "Campo obrigatório" }),
  permissions: z.array(z.string())
  .refine((value) => value.length >= 1, {
    message: "Você deve selecionar pelo menos um departamento.",
  }),
});

type FormTypes = z.infer<typeof formSchema>;

export function CreateNewUserDialog() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const { control, register, handleSubmit, formState: { errors } } = useForm<FormTypes>({
    resolver: zodResolver(formSchema)
  });

  const createUser = async (data: FormTypes) => {
    setIsLoading(true);

    const { name, email, password, permissions } = data;

    try {
      await api.post("/register", {
        name,
        email,
        password,
        permissions,
        type: "support",
      })

      toast({
        title: "Conta criada"
      });

      window.location.reload();
    } catch(err: unknown) {
      const error = err as AxiosError;
      const data = error.response?.data as { message: string }

      toast({
        title: data.message
      })
    } finally {
      setIsLoading(false);
    }
  }

  return(
    <Dialog>
      <Button
        asChild
        size="sm"
        className="gap-1 hidden md:flex"
      >
        <DialogTrigger>
          <UserPlus className="size-4"/>

          Criar usuario
        </DialogTrigger>
      </Button>

      <Button
        asChild
        size="icon"
        className="gap-1 flex md:hidden"
      >
        <DialogTrigger>
          <UserPlus className="size-4"/>
        </DialogTrigger>
      </Button>

      <DialogPortal>
        <DialogOverlay className="opacity-20"/>

        <DialogContent className="h-full md:h-fit flex flex-col">
          <DialogHeader className="text-left">
            <DialogTitle>
              Criar um novo usuário suporte
            </DialogTitle>

            <DialogDescription>
              Somente o administrador é capaz de criar um usuário
            </DialogDescription>
          </DialogHeader>

          <form
            className="h-full flex flex-col justify-between gap-5"
            onSubmit={handleSubmit(createUser)}
          >
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Nome</label>

                <input
                  required
                  id="name"
                  className="input"
                  {...register("name")}
                  placeholder="Informe o nome"
                />

                {errors.name && (
                  <span className="leading-none text-xs text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>

                <input
                  required
                  id="email"
                  className="input"
                  {...register("email")}
                  placeholder="Informe o email"
                />

                {errors.email && (
                  <span className="leading-none text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password">Senha</label>

                <div className="relative">
                  <input
                    required
                    id="password"
                    className="w-full input"
                    {...register("password")}
                    placeholder="Informe a senha"
                    type={visiblePassword ? "text" : "password"}
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

              <div className="flex flex-col gap-1">
                <label htmlFor="permissions">Permissões</label>

                <Controller
                  name="permissions"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      {permissions.map(permission => (
                        <div key={permission.value} className="flex items-center gap-2">
                          <Checkbox
                            id={permission.value}
                            value={permission.value}
                            checked={field.value?.includes(permission.value) || false}
                            onCheckedChange={(checked) => {
                              
                              const currentValues = field.value || [];
                              const newValues = checked
                                ? [...currentValues, permission.value]
                                : currentValues.filter(v => v !== permission.value);
                              field.onChange(newValues);
                            }}
                          />
                          <label htmlFor={permission.value}>
                            {permission.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                />

                {errors.name && (
                  <span className="leading-none text-xs text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full disabled:opacity-50"
              >
                {isLoading ? <LoaderCircle className="size-4 animate-spin"/> : "Criar usuário"}
              </Button>

              <Button 
                asChild 
                className="w-full max-w-96 rounded-md bg-zinc-200 hover:bg-zinc-300 text-black"
              >
                <DialogClose>
                  Cancelar
                </DialogClose>
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}