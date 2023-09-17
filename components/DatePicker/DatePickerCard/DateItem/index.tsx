import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { Locale, isSameDay } from "date-fns-jalali";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { cn } from "@/lib/utils";
import { dateStatus } from "@/shared/types";
import { formatToLocale, isSameMonth } from "@/utils/dateUtils";

type Props = {
  date: Date;
  locale: Locale;
  datePicker: dateStatus;
  dateItemClassName?: string;
  transitionDirection: "left" | "right";
  setDatePicker: Dispatch<SetStateAction<dateStatus>>;
  onChange: (value: Date) => void;
};

export default function DateItem({
  date,
  locale,
  datePicker,
  setDatePicker,
  dateItemClassName,
  transitionDirection,
  onChange,
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
        <div>
          <div
            id="date-picker-card"
            className={cn(
              "grid place-content-center p-0.5 z-10 lg:w-7 lg:h-7 lg:hover:bg-card-foreground/10 rounded-full",
              !isSameMonth(date, datePicker.currentDate, locale) &&
                "text-card-foreground/40",
              isSameDay(date, datePicker.selectedDate) &&
                "relative after:-z-10 after:w-7 after:h-7 after:absolute after:bg-card-foreground after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:rounded-full text-secondary opacity-100",
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
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
