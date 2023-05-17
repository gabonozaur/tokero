import { createContext } from "react";
import ChartComponent from "../Chart";
import { PairsDTO } from "../Chart/types";
import FilterInput from "../FilterInput";
import { UseHome } from "./types";
import useHome from "./useHome";

export const HomeContext = createContext<UseHome>(null);

const Home: React.FC<{ pairs: PairsDTO[] }> = ({ pairs }) => {
  const hookValues = useHome(pairs);
  const { records, fetching } = hookValues;

  return (
    <HomeContext.Provider value={hookValues}>
      <div>
        <FilterInput />
        {fetching ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "512px",
            }}
          >
            now fetching
          </div>
        ) : (
          <ChartComponent records={records} />
        )}
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
