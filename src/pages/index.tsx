import Home from "@/components/Home";
import axios from "axios";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Tokero</title>
      </Head>
      <Home pairs={props.pairs} />
    </>
  );
}

export const getServerSideProps = async () => {
  const pairs = await axios.get("https://gate.tokero.com/api/coin-pairs/").then(
    (res) => res.data,
    (err) => null
  );
  return { props: { pairs } };
};
