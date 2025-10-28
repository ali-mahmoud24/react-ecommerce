export const formatCurrency = (
  value: number,
  currency: string = "EGP",
  locale: string = "ar-EG"
): string => {
  if (isNaN(value)) return "0";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
