import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getUser } from "@/lib/auth";
import { BackPage } from "@/components/BackPage";
import { FormProfile } from "./FormProfile";
import { ListCausesByUser } from "./ListCausesByUser";

export default () => {

  const user = getUser();

  if(!user) {
    throw new Error("Unauthenticated")
  }

  return(
    <div className="w-full max-w-[1120px] px-5 md:px-0 mx-auto">
      <Header/>

      <div className="min-h-screen mt-10">
        <div>
          <BackPage/>

          <h1 className="mt-5 text-2xl font-bold">Meu Perfil</h1>

          <div>
            <FormProfile userId={user.id}/>
          </div>
        </div>

        <ListCausesByUser userId={user.id}/>
      </div>

      <Footer/>
    </div>
  );
}