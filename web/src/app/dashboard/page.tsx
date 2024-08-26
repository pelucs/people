import Link from "next/link";

import { Plus } from "lucide-react";
import { User } from "@/types/user";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { fetchUser } from "@/http/fetchUser";
import { ListOfCausesForAdmin } from "./ListOfCausesForAdmin";
import { CreateNewUserDialog } from "./CreateNewUserDialog";

export default async () => {

  const user: User = await fetchUser();

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
              {user.type === "admin" ? "Admin" : "Suporte"}
            </span>
          </div>

          {user.permissions.includes("create") && (
            <div className="flex items-center gap-2">
              <div>
                  <Button 
                    asChild 
                    size="sm"
                    className="gap-1 hidden md:flex"
                  >
                    <Link href="/dashboard/nova-causa">
                      <Plus className="size-4"/>

                      Nova causa
                    </Link>
                  </Button>

                <Button 
                  asChild 
                  size="icon"
                  className="gap-1 flex md:hidden"
                  >
                  <Link href="/dashboard/nova-causa">
                    <Plus className="size-4"/>
                  </Link>
                </Button>
              </div>

              {user.type === "admin" && (
                <CreateNewUserDialog/>
              )}
            </div>
          )}
        </div>

        <ListOfCausesForAdmin user={user}/>
      </div>

      <Footer/>
    </div>
  );
}