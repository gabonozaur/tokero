import ChartPlg from "@/components/Chart";
import { generateCurrencies } from "@/components/utils/generateCurrencies";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export default function Home(props: any) {
  const [records, setRecords] = useState([]);
  const [fetching, setFetching] = useState(true);

  const { coinsArray, currenciesArray } = useMemo(
    () => generateCurrencies(props.pairs),

    [props]
  );

  const callRandom = () => {
    const date1 = new Date();
    const date2 = new Date();

    axios
      .post("/api/generate-random", {
        startDate: date1.toISOString(),
        endDate: date2.toISOString(),
        coinsArray,
        currenciesArray,
      })
      .then(
        (res) => {
          setRecords(res.data);
          setFetching(false);
        },
        (err) => {
          console.log("err");
          setFetching(false);
        }
      );
  };

  useEffect(() => {
    callRandom();
  }, []);

  return fetching ? <>now fetching</> : <ChartPlg records={records} />;
}

export const getServerSideProps = async () => {
  const pairs = await axios.get("https://gate.tokero.com/api/coin-pairs/").then(
    (res) => res.data,
    (err) => null
  );
  return { props: { pairs } };
};
