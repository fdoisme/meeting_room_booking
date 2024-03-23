import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../views/Home";
import Room from "../views/Room";
import Login from "../views/Login";
import Register from "../views/Register";
import Admin from "../views/Admin";
import Forbidden from "../views/Forbidden";

function navigationGuard() {
  if (localStorage.access_token) return redirect("/");
  return null;
}
function navigationGuardRestricted() {
  if (!localStorage.access_token) return redirect("/login");
  return null;
}
function navigationGuardForAdmin() {
  if (!localStorage.access_token) return redirect("/login");
  if (localStorage.role != "admin") {
    return redirect("/forbidden");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id",
        loader: navigationGuardRestricted,
        element: <Room />,
      },
      {
        path: "/admin",
        loader: navigationGuardForAdmin,
        element: <Admin />,
      },
    ],
  },
  {
    path: "/login",
    loader: navigationGuard,
    element: <Login />,
  },
  {
    path: "/register",
    loader: navigationGuard,
    element: <Register />,
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
]);

export default router;
