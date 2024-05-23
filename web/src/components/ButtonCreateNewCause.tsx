import Link from "next/link";
import { Button } from "./ui/button";
import { HeartHandshake, Plus } from "lucide-react";

export function ButtonCreateNewCause() {
  return(
    <div>
      <Button 
        asChild 
        className="hidden md:flex gap-1 bg-green-500 hover:bg-green-600"
      >
        <Link href="/nova-causa">
          <HeartHandshake className="size-5"/>
          
          Nova Causa
        </Link>
      </Button>

      <Button 
        asChild 
        className="md:hidden fixed bottom-5 right-5 size-12 rounded-full bg-green-500 hover:bg-green-600"
      >
        <Link href="/nova-causa">
          <Plus className="size-5"/>
        </Link>
      </Button>
    </div>
  );
}