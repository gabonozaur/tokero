import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { PairsDTO } from "../Chart/types";
import { FeePairDTO } from "../utils/feePair";
import { generateCurrencies } from "../utils/generateCurrencies";
import { UseHome } from "./types";
const actualDate = new Date().toISOString();

const useHome = (pairs: PairsDTO[]): UseHome => {
  const [records, setRecords] = useState<FeePairDTO[][]>([]);
  const [fetching, setFetching] = useState(true);
  const [startDate, setStartDate] = useState(actualDate);
  const [endDate, setEndDate] = useState(actualDate);

  const { coinsArray, currenciesArray } = useMemo(
    () => generateCurrencies(pairs),

    [pairs]
  );

  const seeLastXDays = (count: number) => {
    const newEnd = new Date(actualDate);
    const newStart = new Date(actualDate);

    newStart.setDate(newStart.getDate() - count);

    setStartDate(newStart.toISOString());
    setEndDate(newEnd.toISOString());
  };

  const seeLastMonth = () => {
    const newEnd = new Date(actualDate);
    const newStart = new Date(actualDate);

    newStart.setMonth(newStart.getMonth() - 1);

    setStartDate(newStart.toISOString());
    setEndDate(newEnd.toISOString());
  };

  const callRandom = () => {
    setFetching(true);

    axios
      .post("/api/generate-random", {
        startDate,
        endDate,
        coinsArray,
        currenciesArray,
      })
      .then(
        (res) => {
          setRecords(res.data);
          setFetching(false);
        },
        () => {
          setFetching(false);
          alert("something went wrong");
        }
      );
  };

  useEffect(() => {
    callRandom();
  }, [startDate, endDate]);

  return {
    records,
    fetching,
    seeLastXDays,
    seeLastMonth,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  };
};

export default useHome;
