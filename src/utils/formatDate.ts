import { format, isValid, parseISO } from "date-fns";

export enum DateFormat {
  SHORT_DATE = "dd/MM/yyyy",
  LONG_DATE = "dd MMMM yyyy",
  TIME = "HH:mm:ss",
  DATE_TIME = "dd/MM/yyyy HH:mm:ss",
}

export function formatDate(
  value: string | Date | null,
  formatString = DateFormat.DATE_TIME
): string {
  if (!value) return "";

  // Parse the input value if it's a string in ISO format
  const date = typeof value === "string" ? parseISO(value) : value;

  // Check if the date is valid before formatting
  if (isValid(date)) {
    return format(date, formatString);
  }

  return "";
}
