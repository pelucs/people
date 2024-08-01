import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getUser } from "@/lib/auth";
import { CreateCauseForm } from "./CreateCauseForm";

export default () => {

  const user = getUser();

  if(!user) {
    throw new Error("Unauthenticated")
  }

  return(
    <div className="w-full">
      <Header/>

      <div className="mt-10 px-5 md:px-14">
        <div>
          <h1 className="text-2xl font-bold">Criar nova causa</h1>

          <span className="text-sm text-muted-foreground font-semibold">
            Preencha todos os campos corretamente
          </span>
        </div>

        <CreateCauseForm userId={user.id}/>
      </div>

      <Footer/>
    </div>
  );
}