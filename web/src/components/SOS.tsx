import { CloudRain } from "lucide-react"

export function SOS() {
  return(
    <a 
      target="_blank" 
      href="https://www.vakinha.com.br/tag/sos_enchentes"
      className="px-2 py-3 flex items-center justify-center bg-zinc-800 text-white"
    >
      <span className="text-xs text-center flex flex-col md:flex-row items-center gap-2 leading-tight">
        <span className="flex items-center gap-2">
          <CloudRain className="size-6 text-green-500"/>
          <strong className="text-green-500">SOS Enchentes!</strong>
        </span>

        Ajude nossos irmãos gaúchos que foram atingidos pelas chuvas.
      </span>
    </a>
  );
}