export const currentDate = (): string =>
  new Date().toLocaleDateString('pl-EU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
