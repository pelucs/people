"use client"

import * as React from "react"
import { addDays, format, interval, intervalToDuration, isWithinInterval, subDays } from "date-fns"

import { cn } from "@/lib/utils"
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { intervalDate } from "@/helpers/format-date";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (newDate: Date | undefined) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarDays className="mr-2 size-4" /> 
          {date ? (
            `
              ${format(date, "PPP", { locale: ptBR })} 
              (${intervalDate({ start: new Date(), end: new Date(date)}).days} dias)
            `
          ) : (
            <span>Selecione a data de expiração</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          initialFocus
          locale={ptBR}
          selected={date}
          onSelect={setDate}
          fromDate={addDays(new Date(), 1)}
        />
      </PopoverContent>
    </Popover>
  )
}
