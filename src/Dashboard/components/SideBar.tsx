import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase";
import { LayoutDashboard, LogOut, NotebookPen } from "lucide-react";

const SideBar = () => {
  const auth = getAuth(app);

  const logout = () => {
    signOut(auth);
  };
  return (
    <nav className="bg-neutral-700">
      <ul className="">
        <Link to={"/dashboard"}>
          <li className="text-neutral-200 px-3 py-2 hover:bg-neutral-600 font-medium flex gap-2">
            <LayoutDashboard />
            Dashboard
          </li>
        </Link>
        <Link to={"/dashboard/posts"}>
          <li className="text-neutral-200 px-3 py-2 hover:bg-neutral-600 font-medium flex gap-2">
            <NotebookPen />
            Posts
          </li>
        </Link>
        <li
          onClick={logout}
          className="text-neutral-200 px-3 py-2 hover:bg-neutral-600 hover:cursor-pointer font-medium flex gap-2"
        >
          <LogOut />
          Sair
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
