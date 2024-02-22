import EmptyPage from "@/components/project/EmptyPage";
import ProjectsContainer from "@/components/project/ProjectsContainer";

const Projects = () => {
  const projects = [];
  return projects.length > 0 ? <ProjectsContainer /> : <EmptyPage />;
};

export default Projects;
