import {
  Locale,
  addDays,
  endOfMonth,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns-jalali";

export function getWeekDays(locale: Locale) {
  const firstDOW = startOfWeek(new Date(), {
    locale: locale,
    weekStartsOn: locale.code == "fa-IR" ? 6 : 0,
  });
  const shortWeekDaysArray = Array.from(Array(7)).map((e, i) =>
    format(addDays(firstDOW, i), "EEE", {
      locale: locale,
    }).substring(0, 2)
  );
  return shortWeekDaysArray;
}

export function isSameMonth(date1: Date, date2: Date, locale: Locale) {
  const dateString1 = date1.toLocaleDateString(locale.code, {
    month: "numeric",
    year: "numeric",
  });
  const dateString2 = date2.toLocaleDateString(locale.code, {
    month: "numeric",
    year: "numeric",
  });
  return dateString1 === dateString2;
}

export function formatToLocale(
  date: Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions
) {
  console.log(date.toLocaleDateString(locale.code, options));
  return date.toLocaleDateString(locale.code, options);
}

export function getStartOfMonth(date: Date, locale: Locale) {
  if (locale.code == "fa-IR") return startOfMonth(date);
  else return new Date(date.getFullYear(), date.getMonth(), 1);
}
export function getEndOfMonth(date: Date, locale: Locale) {
  if (locale.code == "fa-IR") return endOfMonth(date);
  else return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
