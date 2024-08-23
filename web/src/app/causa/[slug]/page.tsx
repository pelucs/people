import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getUser } from "@/lib/auth";
import { CardCause } from "./CardCause";
import { SeeOtherCauses } from "./SeeOtherCauses";

export default () => {

  const user = getUser();

  return(
    <div className="w-full">
      <Header/>

      <div className="mt-5 px-5 md:px-14 space-y-14">
        <div className="space-y-5">
          <h1 className="text-2xl font-bold">Abrace essa causa!</h1>
          <CardCause user={user}/>
        </div>
        
        <SeeOtherCauses/>
      </div>

      <Footer/>
    </div>
  );
}