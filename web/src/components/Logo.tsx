import Image from "next/image";

import logo from '@/assets/logo.svg';
import Link from "next/link";

export function Logo(){
  return(
    <Link href="/">
      <Image 
        src={logo}
        alt="Logo BeHero"
        className="w-52"
      />
    </Link>
  );
}