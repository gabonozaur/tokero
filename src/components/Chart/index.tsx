import { Chart } from "react-google-charts";
import { FeePairDTO } from "../utils/feePair";
import useChart from "./useChart";

const ChartComponent: React.FC<{ records: FeePairDTO[][] }> = ({ records }) => {
  const { data } = useChart(records);
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
