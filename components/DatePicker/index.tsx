import {
  addDays,
  endOfWeek,
  startOfWeek,
  eachDayOfInterval,
} from "date-fns-jalali";
import { useEffect, useState } from "react";
import { dateStatus } from "@/shared/types";
import DatePickerCard from "./DatePickerCard";
import DatePickerButton from "./DatePickerButton";
import { getEndOfMonth, getStartOfMonth, getWeekDays } from "@/utils/dateUtils";

type Props = {
  locale: string;
  defaultValue: Date;
  onChange: (date: Date) => void;
};

export default function DatePicker({
  locale = "fa",
  defaultValue = new Date(),
  onChange,
}: Props) {
  const [datePicker, setDatePicker] = useState<dateStatus>({
    currentDate: defaultValue,
    selectedDate: defaultValue.getTime(),
    dateRange: null,
    isShown: false,
  });

  useEffect(() => {
    const firstWeekStart = startOfWeek(
      getStartOfMonth(datePicker.currentDate, locale)
    );
    const lastWeekEnd = endOfWeek(
      getEndOfMonth(datePicker.currentDate, locale)
    );
    const dates = eachDayOfInterval({
      start: addDays(firstWeekStart, 1),
      end: addDays(lastWeekEnd, 1),
    });
    setDatePicker((prevState) => ({ ...prevState, dateRange: dates }));
  }, [datePicker.currentDate, locale]);

  return (
    <div className="font-regularFamily select-none flex flex-col items-center tap-highlight-transparent">
      <DatePickerButton
        datePicker={datePicker}
        locale={locale}
        setDatePicker={setDatePicker}
      />
      <DatePickerCard
        datePicker={datePicker}
        setDatePicker={setDatePicker}
        daysOfWeek={getWeekDays(locale)}
        locale={locale}
        onChange={onChange}
      />
    </div>
  );
}
