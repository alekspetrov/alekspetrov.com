type LocaleOptionsYearType = "numeric" | "2-digit";

type LocaleOptionsMonthType =
  | "numeric"
  | "2-digit"
  | "long"
  | "short"
  | "narrow";

type LocaleOptionsDayType = "numeric" | "2-digit";

export interface LocaleOptions {
  year?: LocaleOptionsYearType;
  month?: LocaleOptionsMonthType;
  day?: LocaleOptionsDayType;
}

const dateToLocale = (date: Date | string, options?: LocaleOptions): string => {
  const defaultOptions: LocaleOptions = {
    month: "long",
    year: "numeric",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(
    "en-us",
    options ? options : defaultOptions
  );
};

export { dateToLocale };
