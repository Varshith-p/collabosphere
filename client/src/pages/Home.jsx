import EmptyPage from "@/components/home/EmptyPage";
import Main from "@/components/home/Main";
import { getProjects } from "@/redux/project/projectSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const Home = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((store) => store.project);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return projects.length > 0 ? <Main /> : <EmptyPage />;
};

export default Home;
