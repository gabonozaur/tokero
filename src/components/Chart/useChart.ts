import { useMemo } from "react";
import { FeePairDTO, generateBuyKey, generateSellKey } from "../utils/feePair";

const useChart = (records: FeePairDTO[][]) => {
  const createListings = () => {
    const buyListing = {} as { [key: string]: number };
    const sellListing = {} as { [key: string]: number };

    records.map(([buy, sell]) => {
      const { date, ...rest } = buy;
      const [currency, coin] = Object.keys(rest)[0].split("-");

      const buyKey = generateBuyKey(currency, coin);
      const sellKey = generateSellKey(currency, coin);

      const buyVolume = buy[buyKey] as number;
      const sellVolume = sell[sellKey] as number;

      buyListing[buyKey] = (buyListing[buyKey] ?? 0) + buyVolume;
      sellListing[sellKey] = (sellListing[sellKey] ?? 0) + sellVolume;
    });

    return { buyListing, sellListing };
  };

  const interpretListings = ({ buyListing, sellListing }) => {
    const result = [] as any;

    Object.keys(buyListing).forEach((buy) => {
      const [currency, coin] = buy.split("-");

      const buyKey = generateBuyKey(currency, coin);
      const sellKey = generateSellKey(currency, coin);

      const buyVolume = buyListing[buyKey] as number;
      const sellVolume = sellListing[sellKey] as number;

      if (buyVolume) {
        result.push([coin, currency + " ", buyVolume]);
      }
      if (sellVolume) {
        result.push([currency + " ", coin + "  ", sellVolume]);
      }
    });

    return result;
  };
  const data = useMemo(() => {
    const result = interpretListings(createListings());

    return result;
  }, [records]);
  return { data };
};

export default useChart;
