import { createContext } from "react";
import ChartComponent from "../Chart";
import FilterInput from "../FilterInput";
import { UseHome } from "./types";
import useHome from "./useHome";

export const HomeContext = createContext<UseHome>(null);

const Home = (props) => {
  const hookValues = useHome(props.pairs);
  const { records, fetching } = hookValues;

  return (
    <HomeContext.Provider value={hookValues}>
      <div>
        <FilterInput />
        {fetching ? <>now fetching</> : <ChartComponent records={records} />}
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
