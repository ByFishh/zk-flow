export const preventBigString = (str: string, max: number): string => {
  const isBig = str.length > max;
  return isBig ? `${str.substring(0, max)}...` : str;
};
