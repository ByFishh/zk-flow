export const cutWalletAdress = (adress: string): string => {
  const getFirstLetters = adress.slice(0, 5);
  const getLastLetters = adress.slice(-5);
  return `${getFirstLetters}...${getLastLetters}`;
};
