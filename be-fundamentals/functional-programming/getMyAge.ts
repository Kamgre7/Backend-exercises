type yearOfBirthday = string | number | Date;

export const validationAge = (birthdayYear: number, currentYear: number) => {
  if (currentYear - birthdayYear > 100) {
    throw new Error(
      "Invalid year of birth. You can't be more than 100 years old "
    );
  }

  if (birthdayYear > currentYear) {
    throw new Error(
      'Invalid year of birth. Birthday year must be lower than current year'
    );
  }
};

const getUserBirthdayYear = (input: yearOfBirthday) =>
  Number(input.toString().match(/\d{4}/g)![0]);

export const getMyAge = (input: yearOfBirthday) => {
  const currentYear = new Date().getFullYear();
  const birthdayYear = getUserBirthdayYear(input);

  validationAge(birthdayYear, currentYear);

  return currentYear - birthdayYear;
};

console.log(getMyAge(new Date(1990, 1, 1)));
console.log(getMyAge('1990'));
console.log(getMyAge(1990));
