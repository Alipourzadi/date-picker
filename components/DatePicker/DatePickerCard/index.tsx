import { Locale } from "date-fns-jalali";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import DateItem from "./DateItem";
import { dateStatus } from "@/shared/types";
import DaysOfWeek from "./DateItem/DaysOfWeek";
import DateNavigation from "./DateNavigation";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  disable?: boolean;
  daysOfWeek: string[];
  datePicker: dateStatus;
  setDatePicker: Dispatch<SetStateAction<dateStatus>>;
  cardClassName?: string;
  dateItemClassName?: string;
  onChange: (value: Date) => void;
};

export default function DatePickerCard({
  locale,
  disable,
  onChange,
  daysOfWeek,
  datePicker,
  setDatePicker,
  cardClassName,
  dateItemClassName,
}: Props) {
  const ref = useRef<any>(null);
  const [transitionDirection, setTransitionDirection] = useState<
    "right" | "left"
  >("right");

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
      {datePicker.isShown && datePicker.dateRange != undefined && !disable && (
        <div
          className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm max-w-[300px] px-4 py-2 animate-fade-in flex flex-col gap-2 mt-2 divide-y",
            cardClassName
          )}
        >
          <DateNavigation
            locale={locale}
            datePicker={datePicker}
            setDatePicker={setDatePicker}
            setTransitionDirection={setTransitionDirection}
          />
          <div
            dir={locale.code == "fa-IR" ? "rtl" : "ltr"}
            className="grid grid-cols-7 gap-4 justify-between items-stretch pt-2"
          >
            <DaysOfWeek days={daysOfWeek} />
            {datePicker.dateRange.map((date, index) => {
              return (
                <DateItem
                  key={index}
                  date={date}
                  locale={locale}
                  onChange={onChange}
                  datePicker={datePicker}
                  setDatePicker={setDatePicker}
                  transitionDirection={transitionDirection}
                  dateItemClassName={dateItemClassName}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
