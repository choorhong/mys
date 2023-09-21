export const capitalizeFirstLetter = (word?: string | null) => {
  if (!word) return "";
  return word.replace(/^(.)/, (match) => match.toUpperCase());
};

export const formatNumberToLocaleString = (num: string | number) => {
  const n = +num;
  const formattedNumber = Number(n.toFixed(2)).toLocaleString();
  return formattedNumber;
};
