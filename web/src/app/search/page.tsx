import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListCausesBySearch } from "./ListCausesBySearch";

export default () => {
  return(
    <div className="w-full space-y-10">
      <Header/>

      <div className="min-h-screen px-5 md:px-14 space-y-4">
        <ListCausesBySearch/>
      </div>

      <Footer/>
    </div>
  );
}