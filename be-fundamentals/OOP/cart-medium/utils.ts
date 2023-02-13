export const currentDate = (): string =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');
