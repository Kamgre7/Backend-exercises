export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const dateFormatRegex = /^\d{4}[\/.]\d{1,2}[\/.]\d{1,2}$/;

export const DAY_IN_MILLISECONDS = 1000 * 3600 * 24;
export const ALLOWED_BOOKING_TIME = 7;
export const TIME_PERIOD_TO_UNBLOCK = 30;

export const currentDate = () => new Date();

export const countDays = (from: Date, to: Date): number => {
  const dayFrom = from.getTime();
  const dayTo = to.getTime();

  const differenceInDays = (dayTo - dayFrom) / DAY_IN_MILLISECONDS;

  return Math.floor(differenceInDays);
};
