export const generateCurrencies = (
  props: {
    baseCoinSymbol: string;
    targetCoinSymbol: string;
  }[]
) => {
  const coinsDictionary = {} as { [key: string]: any };
  const currenciesDictionary = {} as { [key: string]: any };

  props.forEach((indexValue) => {
    currenciesDictionary[indexValue.baseCoinSymbol] = 1;
    coinsDictionary[indexValue.targetCoinSymbol] = 1;
  });

  const coinsArray = Object.keys(coinsDictionary);
  const currenciesArray = Object.keys(currenciesDictionary);

  return { coinsArray, currenciesArray };
};
