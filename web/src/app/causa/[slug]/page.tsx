import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BackPage } from "@/components/BackPage";
import { CardCause } from "./CardCause";
import { SeeOtherCauses } from "./SeeOtherCauses";

export default () => {

  return(
    <div className="w-full px-5 md:px-0 max-w-[1120px] mx-auto">
      <Header/>

      <div className="mt-10">
        <BackPage/>

        <h1 className="mt-5 text-2xl font-bold">Abrace essa causa!</h1>

        <CardCause/>
      </div>

      <SeeOtherCauses/>
      <Footer/>
    </div>
  );
}