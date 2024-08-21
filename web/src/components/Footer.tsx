import logo from "@/assets/logotipo-socioambiental.png";
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-14 bg-muted py-8 md:py-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <Image 
            src={logo}
            alt=""
            className="w-[180px]"
          />
        </div>

        <nav className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 md:gap-6">
          <Link href="#" className="hover:text-foreground transition-colors" prefetch={false}>
            Causas
          </Link>

          <Link href="#" className="hover:text-foreground transition-colors" prefetch={false}>
            Sobre nós
          </Link>

          <Link href="#" className="hover:text-foreground transition-colors" prefetch={false}>
            Contato
          </Link>
        </nav>

        <p className="text-sm text-muted-foreground">&copy;2024 Socioambiental.</p>
      </div>
    </footer>
  )
}
