import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { ChartDTO } from "./types";
const data = [["From", "To", "Label"]];

const ChartComponent: React.FC<{ data: ChartDTO[] }> = ({ data: prps }) => {
  const dataRecords = prps.reduce((acc, record) => {
    return [
      ...acc,
      [record.baseCoinSymbol, record.targetCoinSymbol + " ", 2],
      [record.targetCoinSymbol + " ", " " + record.baseCoinSymbol, 12],
    ];
  }, [] as Array<Array<any>>);

  useEffect(() => {
    console.log(prps);
    // console.log("distinct list ist", dataRecords);
  });

  return (
    <Chart
      chartType="Sankey"
      width="100%"
      height="500px"
      data={[...data, ...dataRecords]}
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
