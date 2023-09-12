import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Card, CardHeader } from "../../ui/card";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { addMonths, isSameDay, subMonths } from "date-fns-jalali";
import { formatToLocale } from "@/utils/dateUtils";
import { cn } from "@/lib/utils";
import { dateStatus } from "@/shared/types";

function isSameMonth(date1: Date, date2: Date, locale: string) {
  const dateString1 = date1.toLocaleDateString(locale, {
    month: "numeric",
    year: "numeric",
  });
  const dateString2 = date2.toLocaleDateString(locale, {
    month: "numeric",
    year: "numeric",
  });
  return dateString1 === dateString2;
}

type Props = {
  datePicker: dateStatus;
  setDatePicker: Dispatch<SetStateAction<dateStatus>>;
  locale: string;
  daysOfWeek: string[];
  onChange: (value: Date) => void;
};

export default function DatePickerCard({
  datePicker,
  setDatePicker,
  locale,
  daysOfWeek,
  onChange,
}: Props) {
  const ref = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDatePicker((prevState) => ({ ...prevState, isShown: false }));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePicker, setDatePicker]);
  return (
    <div ref={ref}>
      {datePicker.isShown && datePicker.dateRange != undefined && (
        <Card className="max-w-[300px] px-4 py-2 animate-fade-in  flex flex-col gap-2 mt-2 divide-y">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <button
              onClick={() => {
                setDatePicker((prevState) => ({
                  ...prevState,
                  currentDate: subMonths(prevState.currentDate, 1),
                }));
              }}
            >
              <CaretLeft />
            </button>
            <div className="font-boldFamily">
              {formatToLocale(new Date(datePicker.currentDate), locale, {
                month: "long",
              })}
            </div>
            <button
              onClick={() => {
                setDatePicker((prevState) => ({
                  ...prevState,
                  currentDate: addMonths(prevState.currentDate, 1),
                }));
              }}
            >
              <CaretRight />
            </button>
          </CardHeader>

          <div
            dir={locale == "fa" ? "rtl" : "ltr"}
            className="grid grid-cols-7 gap-4 justify-between items-stretch pt-2"
          >
            {daysOfWeek.map((day, index) => (
              <div className="text-xs text-center font-boldFamily" key={index}>
                {day}
              </div>
            ))}
            {datePicker.dateRange.map((date, index) => {
              return (
                <div
                  className={cn(
                    "text-lg lg:text-sm grid place-content-center z-10 ",
                    !isSameMonth(date, datePicker.currentDate, locale) &&
                      "opacity-20",
                    isSameDay(date, datePicker.selectedDate) &&
                      "relative after:-z-10 after:w-7 after:h-7 after:absolute after:bg-black after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:rounded-full text-secondary opacity-100"
                  )}
                  key={index}
                  onClick={() => {
                    setDatePicker((prevState) => ({
                      ...prevState,
                      selectedDate: date.getTime(),
                      isShown: false,
                    }));
                    onChange(date);
                  }}
                >
                  {formatToLocale(date, locale, { day: "2-digit" })}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
