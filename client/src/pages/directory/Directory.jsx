import { getProjects } from "@/redux/directory/directorySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import EmptyPage from "@/components/directory/EmptyPage";
import ProjectsContainer from "@/components/directory/ProjectsContainer";

const Directory = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((store) => store.directory);

  console.log(projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return projects.length > 0 ? (
    <ProjectsContainer projects={projects} />
  ) : (
    <EmptyPage />
  );
};

export default Directory;
