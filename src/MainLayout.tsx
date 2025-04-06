import { Link, Outlet } from "react-router";
import Navbar from "./components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[500px]">
        <Outlet></Outlet>
      </div>
      <p className="border-t py-3 text-sm text-center">
        &copy; All right reserved by{" "}
        <span className="text-violet-700">
          <Link to="https://rakibhossen.vercel.app/" target="_blank">
            Rakib Hossen
          </Link>
        </span>{" "}
        || 2025
      </p>
    </div>
  );
};

export default MainLayout;
