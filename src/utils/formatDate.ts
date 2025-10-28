import dayjs from "dayjs";

export const formatDate = (
  date: string | number | Date,
  format: string = "DD MMM, YYYY"
): string => {
  return dayjs(date).format(format);
};
