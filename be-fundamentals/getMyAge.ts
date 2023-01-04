type yearOfBirthday = string | number | Date;

export const getMyAge = (input: yearOfBirthday) => {
  const currentYear = new Date().getFullYear();
  const birthdayYear = Number(input.toString().match(/\d{4}/g)[0]);

  return currentYear - birthdayYear;
};
