import {
  Locale,
  addDays,
  endOfMonth,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns-jalali";

export function getWeekDays(locale: Locale) {
  const firstDayOfWeek = startOfWeek(new Date(), {
    locale: locale,
    weekStartsOn: locale.code == "fa-IR" ? 6 : 0,
  });
  const shortWeekDaysArray = Array.from(Array(7)).map((e, i) =>
    format(addDays(firstDayOfWeek, i), "EEE", {
      locale: locale,
    }).substring(0, 2)
  );
  return shortWeekDaysArray;
}

export function isSameMonth(date1: Date, date2: Date, locale: Locale) {
  const firstDateString = date1.toLocaleDateString(locale.code, {
    month: "numeric",
    year: "numeric",
  });
  const secondDateString = date2.toLocaleDateString(locale.code, {
    month: "numeric",
    year: "numeric",
  });
  return firstDateString === secondDateString;
}

export function formatToLocale(
  date: Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions
) {
  return date.toLocaleDateString(locale.code, options);
}

export function getStartOfMonth(date: Date, locale: Locale) {
  if (locale.code == "fa-IR") return startOfMonth(date);
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
export function getEndOfMonth(date: Date, locale: Locale) {
  if (locale.code == "fa-IR") return endOfMonth(date);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
