import { Faq, GetStarted, Info } from "./ui";

const Home = () => {
  return (
    <div style={{ maxWidth: "1440px" }}>
      <Info />
      <Faq />
      <GetStarted />
    </div>
  );
};

export default Home;
