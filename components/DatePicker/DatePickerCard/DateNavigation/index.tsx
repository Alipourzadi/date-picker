import { Dispatch, SetStateAction } from "react";
import { CaretDown, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Locale, addMonths, subMonths } from "date-fns-jalali";

import { dateStatus } from "@/shared/types";
import { formatToLocale } from "@/utils/dateUtils";

type Props = {
  locale: Locale;
  datePicker: dateStatus;
  setDatePicker: Dispatch<SetStateAction<dateStatus>>;
  setTransitionDirection: Dispatch<SetStateAction<"right" | "left">>;
};

export default function DateNavigation({
  locale,
  datePicker,
  setDatePicker,
  setTransitionDirection,
}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setDatePicker((prevState) => ({
              ...prevState,
              currentDate: subMonths(prevState.currentDate, 1),
            }));
            setTransitionDirection("right");
          }}
          className="lg:hover:bg-card-foreground/10 rounded-full p-1 transition-colors duration-200"
        >
          <CaretLeft size={24} />
        </button>
        <div className="font-boldFamily">
          {formatToLocale(datePicker.currentDate, locale, {
            month: "long",
          })}
        </div>
        <button
          onClick={() => {
            setDatePicker((prevState) => ({
              ...prevState,
              currentDate: addMonths(prevState.currentDate, 1),
            }));
            setTransitionDirection("left");
          }}
          className="lg:hover:bg-card-foreground/20 rounded-full p-1 transition-colors duration-200"
        >
          <CaretRight size={24} />
        </button>
      </div>
    </div>
  );
}
