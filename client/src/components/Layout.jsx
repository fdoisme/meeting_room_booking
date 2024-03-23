import { Outlet } from "react-router-dom";
import Navabar from "./Navbar";

export default function Layout() {
  return (
    <div>
      <Navabar />
      <Outlet />
    </div>
  );
}
