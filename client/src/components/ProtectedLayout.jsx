import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./header/Header";

const ProtectedLayout = () => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className="font-geist">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </section>
  );
};

export default ProtectedLayout;
