import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../../ui/button";
import { formatToLocale } from "@/utils/dateUtils";
import { dateStatus } from "@/shared/types";
import { CalendarBlank } from "@phosphor-icons/react";

type Props = {
  locale: string;
  setDatePicker: Dispatch<SetStateAction<dateStatus>>;
  datePicker: dateStatus;
};

export default function DatePickerButton({
  locale,
  setDatePicker,
  datePicker,
}: Props) {
  return (
    <Button
      onClick={() => {
        setDatePicker((prevState) => ({
          ...prevState,
          isShown: !prevState.isShown,
        }));
      }}
      className="gap-2"
    >
      <CalendarBlank size={20} />
      <div>
        {formatToLocale(new Date(datePicker.selectedDate), locale, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
    </Button>
  );
}
