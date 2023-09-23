import { Locale } from "date-fns-jalali";
import { useState, Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";
import DateItem from "./DateItem";
import { dateStatus } from "@/shared/types";
import DaysOfWeek from "./DateItem/DaysOfWeek";
import DateNavigation from "./DateNavigation";

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
  const [transitionDirection, setTransitionDirection] = useState<
    "right" | "left"
  >("right");

  return (
    <>
      {datePicker.dateRange != undefined && !disable && (
        <div
          className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm w-[300px] origin-bottom transition-all px-4 py-2 animate-fade-in flex flex-col gap-2 mt-2 divide-y",
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
            className="space-y-2"
          >
            <DaysOfWeek days={daysOfWeek} />
            <DateItem
              locale={locale}
              onChange={onChange}
              datePicker={datePicker}
              setDatePicker={setDatePicker}
              dateItemClassName={dateItemClassName}
              transitionDirection={transitionDirection}
            />
          </div>
        </div>
      )}
    </>
  );
}
