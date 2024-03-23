import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
export default function Navabar() {
  const navigate = useNavigate();
  const menu = ["Login", "Register", "Home", "Admin"];
  function activeNav({ isActive }) {
    return isActive ? { color: "white", backgroundColor: "#374151" } : {};
  }
  function logoutHandle() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <nav className="bg-white fixed w-full z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <div
              className="relative inline-flex items-center justify-center rounded-md p-2 text-pink-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <GiHamburgerMenu color="#ab1352" size={30} />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start relative md:h-[80%]">
            <div className="flex h-[5vh] md:flex-shrink-0 md:h-full items-center rounded-full overflow-hidden">
              <img
                className="h-full w-auto cursor-pointer"
                src="logo.png"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block top-[50%]  left-[50%] -translate-x-2/4 -translate-y-2/4 absolute">
              <div className="flex space-x-4">
                {!localStorage.access_token && (
                  <>
                    <NavLink
                      style={activeNav}
                      className="active text-pink-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      to={"/login"}
                    >
                      <p className="text-xl">Login</p>
                    </NavLink>
                    <NavLink
                      style={activeNav}
                      className="active text-pink-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      to={"/register"}
                    >
                      <p className="text-xl">Register</p>
                    </NavLink>
                  </>
                )}
                <NavLink
                  style={activeNav}
                  className="active text-pink-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  to={"/"}
                >
                  <p className="text-xl">Home</p>
                </NavLink>
                <NavLink
                  style={activeNav}
                  className="active text-pink-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  to={"/admin"}
                >
                  <p className="text-xl">Admin</p>
                </NavLink>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:block top-[50%]  right-0 -translate-y-2/4 absolute">
              <div className="flex space-x-4">
                {localStorage.access_token && (
                  <NavLink
                    onClick={logoutHandle}
                    className="active text-pink-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    <p className="text-xl">Logout</p>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#"
            className="text-pink-800 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Team
          </a>
        </div>
      </div> */}
    </nav>
  );
}
