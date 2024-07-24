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
    <div className="w-full px-20 space-y-10">
      <Header/>

      <div className="min-h-screen space-y-5">
        <h1 className="text-2xl font-bold">Área admin</h1>
        <ListCausesByUser userId={user.id}/>
      </div>

      <Footer/>
    </div>
  );
}          

{/* <div>
  <FormProfile userId={user.id}/>
</div> */}