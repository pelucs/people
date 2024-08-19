import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getUser } from "@/lib/auth";
import { ListOfCausesForAdmin } from "./ListOfCausesForAdmin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default () => {

  const user = getUser();

  if(!user) {
    throw new Error("Unauthenticated")
  }

  return(
    <div className="w-full space-y-10">
      <Header/>

      <div className="min-h-screen px-5 md:px-14 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-2xl font-bold">
              Dashboard
            </h1>

            <span className="py-2 px-3 rounded-md text-xs text-primary bg-primary/10">
              Suporte
            </span>
          </div>

          <Button 
            asChild 
            size="sm"
            className="gap-1"
          >
            <Link href="/dashboard/nova-causa">
              <Plus className="size-4"/>

              Nova causa
            </Link>
          </Button>
        </div>

        <ListOfCausesForAdmin/>
      </div>

      <Footer/>
    </div>
  );
}