export const toCapitalize = (input: string): string => {
  let result = '';
  let capitalizeNext = true;

  for (const char of input) {
    if (char === ' ') {
      capitalizeNext = true;
      result += char;
    } else {
      result += capitalizeNext ? char.toUpperCase() : char;
      capitalizeNext = false;
    }
  }
  return result;
};
