export const dateToLocale = (date: Date, options?): string => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  return new Date(date).toLocaleDateString(
    'en-us',
    options ? options : defaultOptions
  )
}
