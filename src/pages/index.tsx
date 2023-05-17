import axios from "axios";
import { useEffect } from "react";

export default function Home(props: any) {
  console.log("data", props);
  useEffect(() => {
    console.log("data is data", props);
  });
  return (
    <main>
      this is initial
      <button
        onClick={() => {
          console.log(props);
        }}
      >
        gigi
      </button>
    </main>
  );
}

export const getServerSideProps = async () => {
  const data = await axios.get("https://gate.tokero.com/api/coin-pairs/").then(
    (res) => res.data,
    (err) => null
  );
  return { props: { data } };
};
