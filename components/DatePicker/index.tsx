import {
  addDays,
  endOfWeek,
  startOfWeek,
  eachDayOfInterval,
  getTime,
  Locale,
  subDays,
} from "date-fns-jalali";
import { useEffect, useState } from "react";
import { dateStatus } from "@/shared/types";
import DatePickerCard from "./DatePickerCard";
import DatePickerButton from "./DatePickerButton";
import { getEndOfMonth, getStartOfMonth, getWeekDays } from "@/utils/dateUtils";
import { faIR } from "date-fns-jalali/locale";

type Props = {
  locale: Locale;
  defaultValue: Date;
  cardClassName?: string;
  triggerClassName?: string;
  dateItemClassName?: string;
  onChange: (date: Date) => void;
  disabled?: boolean;
};

export default function DatePicker({
  onChange,
  locale = faIR,
  defaultValue = new Date(),
  cardClassName,
  triggerClassName,
  dateItemClassName,
  disabled,
}: Props) {
  const [datePicker, setDatePicker] = useState<dateStatus>({
    isShown: false,
    dateRange: null,
    currentDate: defaultValue,
    selectedDate: getTime(defaultValue),
  });
  const [matchesToMediaQuery, setMatchesToMediaQuery] = useState({
    isMatched: false,
    query: "(min-width:1024px)",
  });

  const query = useEffect(() => {
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

  useEffect(() => {
    const media = window.matchMedia(matchesToMediaQuery.query);
    const listener = () =>
      setMatchesToMediaQuery((prevState) => ({
        ...prevState,
        isMatched: media.matches,
      }));
    if (media.matches !== matchesToMediaQuery.isMatched) {
      listener();
    }
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matchesToMediaQuery, query]);

  return (
    <div className="font-regularFamily select-none flex flex-col items-center tap-highlight-transparent">
      <DatePickerButton
        locale={locale}
        datePicker={datePicker}
        setDatePicker={setDatePicker}
        triggerClassName={triggerClassName}
        disable={disabled}
      />
      <DatePickerCard
        locale={locale}
        onChange={onChange}
        datePicker={datePicker}
        setDatePicker={setDatePicker}
        daysOfWeek={getWeekDays(locale)}
        cardClassName={cardClassName}
        dateItemClassName={dateItemClassName}
        disable={disabled}
      />
    </div>
  );
}
