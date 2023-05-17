import { useMemo } from "react";
import { Chart } from "react-google-charts";
import { FeePairDTO, generateBuyKey, generateSellKey } from "../utils/feePair";

const ChartComponent: React.FC<{ records: FeePairDTO[][] }> = ({ records }) => {
  const data = useMemo(() => {
    const buyListing = {} as { [key: string]: number };
    const sellListing = {} as { [key: string]: number };
    const result = [] as any;

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
  }, [records]);

  return (
    <Chart
      chartType="Sankey"
      width="100%"
      height="500px"
      data={[["From", "To", "Value"], ...data]}
      options={{
        sankey: {
          link: {
            colorMode: "gradient",
          },
          levels: {
            count: 2,
          },
        },
      }}
    />
  );
};

export default ChartComponent;
