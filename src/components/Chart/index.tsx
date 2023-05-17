import { Chart } from "react-google-charts";
import { generateCurrencies } from "../utils/generateCurrencies";
import generateFeePair, {
  generateBuyKey,
  generateSellKey,
} from "../utils/generateFeePair";
import { ChartDTO } from "./types";

const ChartComponent: React.FC<{ data: ChartDTO[] }> = ({ data }) => {
  const { coinsArray, currenciesArray } = generateCurrencies(data);
  const records = coinsArray.reduce(
    (acumulator, coin) => {
      const transactions = currenciesArray.map((currency) =>
        generateFeePair("eliot", currency, coin)
      );
      return [...acumulator, ...transactions];
    },
    [] as {
      [x: string]: string | number;
      date: string;
    }[][]
  );

  console.log("records", records);

  const marco = records.reduce((acc, [buy, sell]) => {
    const { date, ...rest } = buy;
    const [currency, coin] = Object.keys(rest)[0].split("-");
    const buyVolume = buy[generateBuyKey(currency, coin)];
    const sellVolume = sell[generateSellKey(currency, coin)];

    const result = [];

    if (buyVolume) {
      result.push([coin, currency + " ", buyVolume]);
    }
    if (sellVolume) {
      result.push([currency + " ", coin + "  ", sellVolume]);
    }

    return [...acc, ...result];
  }, [] as any);

  return (
    <Chart
      chartType="Sankey"
      width="100%"
      height="500px"
      data={[["From", "To", "Value"], ...marco]}
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
