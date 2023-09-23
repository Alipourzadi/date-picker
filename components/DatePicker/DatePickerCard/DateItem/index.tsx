import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { Locale, isSameDay } from "date-fns-jalali";

import { cn } from "@/lib/utils";
import { dateStatus } from "@/shared/types";
import { formatToLocale, isSameMonth } from "@/utils/dateUtils";
import { CSSTransition, SwitchTransition } from "react-transition-group";

type Props = {
  locale: Locale;
  datePicker: dateStatus;
  dateItemClassName?: string;
  setDatePicker: Dispatch<SetStateAction<dateStatus>>;
  transitionDirection: "left" | "right";
  onChange: (value: Date) => void;
};

export default function DateItem({
  locale,
  onChange,
  datePicker,
  setDatePicker,
  dateItemClassName,
  transitionDirection,
}: Props) {
  const router = useRouter();

  return (
    <SwitchTransition>
      <CSSTransition
        key={datePicker.currentDate.getMonth()}
        timeout={200}
        in={router.isReady}
        classNames={
          transitionDirection == "left" ? "enter-left" : "enter-right"
        }
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <div className="grid grid-cols-7 gap-4 justify-between items-stretch pt-2">
          {datePicker.dateRange?.map((date, index) => (
            <div
              key={index}
              className={cn(
                "text-lg grid place-content-center z-10 lg:w-7 lg:h-7 lg:hover:bg-card-foreground/10 rounded-full lg:cursor-pointer",
                !isSameMonth(date, datePicker.currentDate, locale) &&
                  "text-card-foreground/40",
                isSameDay(date, datePicker.selectedDate) &&
                  "relative after:-z-10 after:w-8 after:h-8 after:absolute after:bg-card-foreground after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:rounded-full text-secondary opacity-100",
                dateItemClassName
              )}
              onClick={() => {
                setDatePicker((prevState) => ({
                  ...prevState,
                  selectedDate: date.getTime(),
                  isShown: false,
                }));
                onChange(date);
              }}
            >
              {formatToLocale(date, locale, { day: "numeric" })}
            </div>
          ))}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
