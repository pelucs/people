import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CardCause } from "./CardCause";
import { SeeOtherCauses } from "./SeeOtherCauses";

export default () => {

  const user = getUser();

  return(
    <div className="w-full">
      <Header/>

      <div className="mt-5 px-5 md:px-14 space-y-14">
        <CardCause user={user}/>        
        <SeeOtherCauses/>
      </div>

      <Footer/>
    </div>
  );
}