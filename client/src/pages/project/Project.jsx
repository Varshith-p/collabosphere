// import Board from "@/components/Board";
import Sidebar from "@/components/project/Sidebar";
import { getProject, getUsers } from "@/redux/project/projectSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import Loading from "../Loading";

const Project = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project, isLoading } = useSelector((store) => store.project);

  useEffect(() => {
    dispatch(getProject({ id }));
    dispatch(getUsers());
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full h-[calc(100vh-64px)]">
      <Sidebar project={project} />
      <div className="flex-[1_0_0] overflow-auto">
        <Outlet context={[project]} />
      </div>
    </div>
  );
};

export default Project;
