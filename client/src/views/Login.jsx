import { NavLink, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useState } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:2024";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function onChange(event) {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  }
  function toRegister() {
    navigate("/register");
  }
  async function loginSubmit() {
    try {
      //   console.log(form);
      const { data } = await axios.post(`${BASE_URL}/login`, form);
      if (data.role) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("role", data.role);
      } else {
        localStorage.setItem("access_token", data);
      }
      toast.success("Login Success !");
      navigate("/");
      //   console.log(data);
    } catch (error) {
      toast.error("error.response.data.message");
      console.log(error.response.data.message);
    }
  }
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
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
        <div className="bg-[#ede6e9] h-[60vh] w-96 rounded-lg shadow-2xl drop-shadow-2xl flex justify-center">
          <div className="w-[90%] p-10 flex flex-col gap-7">
            <h1 className="self-center font-bold text-2xl text-[#9e0c49]">
              SIGN IN
            </h1>
            <form action="" className="flex flex-col gap-7">
              <FormInput
                label={"Email"}
                placeholder={"johndoe@mail.com"}
                value={form.email}
                name={"email"}
                onChange={onChange}
              />
              <FormInput
                label={"Password"}
                placeholder={"·········"}
                type={"Password"}
                value={form.password}
                name={"password"}
                onChange={onChange}
              />
            </form>
            <div className="flex flex-col gap-3">
              <button
                onClick={loginSubmit}
                className="bg-[#9e0c49] rounded-full h-12 w-full text-white"
              >
                Login
              </button>
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-black" />
                <span className="flex-shrink px-5 text-bborder-black">or</span>
                <div className="flex-grow border-t border-black" />
              </div>
              <button
                onClick={toRegister}
                className="bg-white rounded-full h-12 w-full"
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
