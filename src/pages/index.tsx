import ChartPlg from "@/components/Chart";
import axios from "axios";
import { useEffect } from "react";

export default function Home(props: any) {
  return <ChartPlg data={props.data} />;
}

export const getServerSideProps = async () => {
  const data = await axios.get("https://gate.tokero.com/api/coin-pairs/").then(
    (res) => res.data,
    (err) => null
  );
  return { props: { data } };
};
