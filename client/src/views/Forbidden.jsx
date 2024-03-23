import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Forbidden() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen">
      <div className="absolute top-[5%] left-[10%]">
        <div className="rounded-full overflow-hidden">
          <NavLink to={"/"}>
            <img
              className="h-[7vh] md:h-[10vh] cursor-pointer bg-slate-600"
              src="logo.png"
              alt="Your Company"
            />
          </NavLink>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <p className="self-center text-[30vh]">FORBIDDEN</p>
      </div>
    </div>
  );
}
