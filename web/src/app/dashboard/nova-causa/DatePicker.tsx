"use client"

import * as React from "react"
import { ptBR } from "date-fns/locale"
import { format, intervalToDuration, subDays } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: DateRange | undefined
  setDate: (newDates: DateRange | undefined) => void;
}

export function DatePicker(
  { date, setDate }: DatePickerProps, 
  { className }: React.HTMLAttributes<HTMLDivElement>,
) {
  
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "flex-1 justify-start gap-2 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarDays className="h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                  
                  {/* <span className="py-1 px-2 rounded-md bg-primary/10 text-xs">
                    {intervalToDuration({ start: new Date(date.from), end: new Date(date.to) }).days} dias
                  </span> */}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Selecione as datas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            locale={ptBR}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            defaultMonth={date?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
