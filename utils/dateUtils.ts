import { endOfMonth, startOfMonth } from "date-fns-jalali";

export function formatToLocale(
  date: Date,
  locale: Intl.LocalesArgument,
  option: Intl.DateTimeFormatOptions | undefined
) {
  return date.toLocaleDateString(locale, option);
}

export function getWeekDays(lang: Intl.LocalesArgument) {
  const result = [];
  for (var i = 0; i <= 6; ++i) {
    const d = new Date(1970, 1, 1 + i);
    result.push(d.toLocaleString(lang, { weekday: "short" }).substring(0, 2));
  }
  return result;
}

export function getStartOfMonth(date: Date, locale: string = "fa") {
  if (locale == "fa") return startOfMonth(date);
  else return new Date(date.getFullYear(), date.getMonth(), 1);
}
export function getEndOfMonth(date: Date, locale: string) {
  if (locale == "fa") return endOfMonth(date);
  else return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
