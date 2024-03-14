import { getProject } from "@/redux/directory/directorySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import Loading from "../Loading";
import Sidebar from "@/components/directory/Sidebar";

const PublicProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project, isLoading } = useSelector((store) => store.directory);

  useEffect(() => {
    dispatch(getProject({ id }));
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

export default PublicProject;
