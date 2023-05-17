export interface FeePairDTO {
  date: string;
  [x: string]: string | number;
}
export const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100);
};

export const generateBuyKey = (currency: string, coin: string) => {
  return `${currency}-${coin}`;
};
export const generateSellKey = (currency: string, coin: string) => {
  return `${coin}-${currency}`;
};

const generateFeePair = (
  date: string,
  currency: string,
  coin: string
): FeePairDTO[] => {
  const buy = generateBuyKey(currency, coin);
  const sell = generateSellKey(currency, coin);

  return [
    { date, [buy]: generateRandomNumber() },
    { date, [sell]: generateRandomNumber() },
  ];
};

export default generateFeePair;
