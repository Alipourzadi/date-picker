import { Locale } from "date-fns-jalali";
import { CalendarBlank } from "@phosphor-icons/react";
import React, { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";
import { dateStatus } from "@/shared/types";
import { formatToLocale } from "@/utils/dateUtils";

type Props = {
  locale: Locale;
  datePicker: dateStatus;
  triggerClassName?: string;
  setDatePicker: Dispatch<SetStateAction<dateStatus>>;
  disable?: boolean;
};

export default function DatePickerButton({
  locale,
  disable,
  datePicker,
  setDatePicker,
  triggerClassName,
}: Props) {
  return (
    <button
      onClick={() => {
        setDatePicker((prevState) => ({
          ...prevState,
          isShown: !prevState.isShown,
        }));
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground h-10 px-4 py-2",
        triggerClassName
      )}
      disabled={disable}
    >
      <CalendarBlank size={20} />
      <div>
        {formatToLocale(new Date(datePicker.selectedDate), locale, {
          year: "numeric",
          month: locale.code == "fa-IR" ? "numeric" : "short",
          day: "numeric",
        })}
      </div>
    </button>
  );
}
