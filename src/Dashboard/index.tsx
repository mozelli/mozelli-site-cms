import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Header from "./components/Header";

const Dashboard = () => {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex h-full">
        <SideBar />
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
