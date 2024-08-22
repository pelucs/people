import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getUser } from "@/lib/auth";
import { EditCauseForm } from "./EditCauseForm";

export default () => {

  const user = getUser();

  if(!user) {
    throw new Error("Unauthenticated")
  }

  return(
    <div className="w-full">
      <Header/>

      <div className="mt-5 min-h-screen px-5 md:px-14">
        <div>
          <h1 className="text-2xl font-bold">Editar causa</h1>

          <span className="text-sm text-muted-foreground">
            Preencha todos os campos corretamente
          </span>
        </div>

        <EditCauseForm/>
      </div>
      
      <Footer/>
    </div>
  );
}