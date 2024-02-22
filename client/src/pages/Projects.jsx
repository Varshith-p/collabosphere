import EmptyPage from "@/components/project/EmptyPage";
import ProjectsContainer from "@/components/project/ProjectsContainer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { useEffect } from "react";
import { getProjects } from "@/redux/project/projectSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((store) => store.project);

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

export default Projects;
