import { Faq, GetStarted, Info } from "./ui";

const Home = () => {
  return (
    <div style={{ maxWidth: "1440px", paddingInline: "15px" }}>
      <title>Главная</title>
      <Info />
      <Faq />
      <GetStarted />
    </div>
  );
};

export default Home;
