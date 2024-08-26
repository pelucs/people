import Image from "next/image";
import Link from "next/link";
import logo from '@/assets/logotipo-socioambiental.png';

export function Logo(){
  return(
    <Link href="/">
      <Image 
        src={logo}
        alt="Logo BeHero"
        className="w-60"
      />
    </Link>
  );
}