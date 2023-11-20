export const isProfit = (str: string): boolean => {
  const getSign = str.slice(0, 1);
  return getSign === "+";
};
