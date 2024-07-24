import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BackPage } from "@/components/BackPage";
import { CardCause } from "./CardCause";
import { SeeOtherCauses } from "./SeeOtherCauses";

export default () => {

  return(
    <div className="w-full">
      <Header/>

      <div className="mt-10 px-20 space-y-5">
        <BackPage/>

        <h1 className="text-2xl font-bold">Abrace essa causa!</h1>

        <CardCause/>
        <SeeOtherCauses/>
      </div>

      <Footer/>
    </div>
  );
}