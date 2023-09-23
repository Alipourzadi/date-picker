import { useEffect, useState } from "react";
import { faIR } from "date-fns-jalali/locale";
import {
  endOfWeek,
  startOfWeek,
  eachDayOfInterval,
  getTime,
  Locale,
} from "date-fns-jalali";

import { dateStatus } from "@/shared/types";
import DatePickerCard from "./DatePickerCard";
import { getEndOfMonth, getStartOfMonth, getWeekDays } from "@/utils/dateUtils";

type Props = {
  locale: Locale;
  defaultValue: Date;
  disabled?: boolean;
  cardClassName?: string;
  dateItemClassName?: string;
  onChange: (date: Date) => void;
};

export default function DatePicker({
  onChange,
  locale = faIR,
  defaultValue = new Date(),
  cardClassName,
  dateItemClassName,
  disabled,
}: Props) {
  const [datePicker, setDatePicker] = useState<dateStatus>({
    dateRange: null,
    currentDate: defaultValue,
    selectedDate: getTime(defaultValue),
  });

  useEffect(() => {
    const firstWeekStart = startOfWeek(
      getStartOfMonth(datePicker.currentDate, locale),
      { locale: locale, weekStartsOn: locale.code == "fa-IR" ? 6 : 0 }
    );
    const lastWeekEnd = endOfWeek(
      getEndOfMonth(datePicker.currentDate, locale),
      { locale: locale, weekStartsOn: locale.code == "fa-IR" ? 6 : 0 }
    );
    const dates = eachDayOfInterval({
      start: firstWeekStart,
      end: lastWeekEnd,
    });
    setDatePicker((prevState) => ({ ...prevState, dateRange: dates }));
  }, [datePicker.currentDate, locale]);

  return (
    <div className="font-regularFamily select-none flex flex-col items-center tap-highlight-transparent">
      <DatePickerCard
        locale={locale}
        disable={disabled}
        onChange={onChange}
        datePicker={datePicker}
        setDatePicker={setDatePicker}
        daysOfWeek={getWeekDays(locale)}
        cardClassName={cardClassName}
        dateItemClassName={dateItemClassName}
      />
    </div>
  );
}
