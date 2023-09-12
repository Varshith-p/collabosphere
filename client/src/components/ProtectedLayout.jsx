import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header";

const ProtectedLayout = () => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
