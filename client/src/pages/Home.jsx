import EmptyPage from "@/components/home/EmptyPage";
import Main from "@/components/home/Main";

const Home = () => {
  const recent = [];
  return recent.length > 0 ? <Main /> : <EmptyPage />;
};

export default Home;
