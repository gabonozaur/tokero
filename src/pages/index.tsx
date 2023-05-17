import Home from "@/components/Home";
import axios from "axios";

export default Home;

export const getServerSideProps = async () => {
  const pairs = await axios.get("https://gate.tokero.com/api/coin-pairs/").then(
    (res) => res.data,
    (err) => null
  );
  return { props: { pairs } };
};
