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

      <div className="min-h-screen px-5 md:px-14 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Área admin
          </h1>

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

{/* <div>
  <FormProfile userId={user.id}/>
</div> */}