import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CardCause } from "./CardCause";
import { SeeOtherCauses } from "./SeeOtherCauses";

export default () => {

  return(
    <div className="w-full">
      <Header/>

      <div className="mt-5 px-5 md:px-14 space-y-5">
        <h1 className="text-2xl font-bold">Abrace essa causa!</h1>

        <CardCause/>
        <SeeOtherCauses/>
      </div>

      <Footer/>
    </div>
  );
}