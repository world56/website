"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { getTimeLanguage } from "@/lib/language";
import { Calendar } from "@/components/ui/calendar";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Calendar as CalendarIcon } from "lucide-react";

import type { DateRange } from "react-day-picker";

interface TypeRangePickerProps {
  value?: DateRange;
  className?: string;
  onChange?(value?: DateRange): void;
}

const DateRangePicker: React.FC<TypeRangePickerProps> = ({
  value,
  onChange,
  className,
}) => {
  const t = useTranslations("common");

  const [locale, setLocale] = useState<Locale>();
  const [date, setDate] = useState<DateRange | undefined>(value);

  function onClear(e: React.MouseEvent<HTMLOrSVGElement>) {
    e.stopPropagation();
    setDate(undefined);
    onChange?.(undefined);
  }

  function onTimeChange(e?: DateRange) {
    setDate(e);
    onChange?.(e?.to ? e : undefined);
  }

  useEffect(() => {
    setLocale(getTimeLanguage());
  }, []);

  return (
    <div className={cn("grid gap-2 relative", className)}>
      {date?.to ? (
        <CloseCircleOutlined
          onClick={onClear}
          className="absolute top-[10px] right-[16px] z-10 cursor-pointer text-gray-500 hover:text-black dark:hover:text-white"
        />
      ) : null}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[265px] justify-start text-left font-normal bg-card",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd", { locale })} -{" "}
                  {format(date.to, "yyyy-MM-dd", { locale })}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd", { locale })
              )
            ) : (
              <span>{t("TimeRangePlaceholder")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            locale={locale}
            selected={date}
            numberOfMonths={2}
            onSelect={onTimeChange}
            defaultMonth={date?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
