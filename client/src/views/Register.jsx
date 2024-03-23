import { NavLink, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useState } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:2024";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  function onChange(event) {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  }
  function toLogin() {
    navigate("/login");
  }
  async function registerSubmit() {
    try {
      await axios.post(`${BASE_URL}/register`, form);
      toast.success("Registrasi Success !");
      navigate("/login");
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
        <div className="bg-[#ede6e9] h-[70vh] w-96 rounded-lg shadow-2xl drop-shadow-2xl flex justify-center">
          <div className="w-[90%] p-10 flex flex-col gap-7">
            <h1 className="self-center font-bold text-2xl text-[#9e0c49]">
              SIGN UP
            </h1>
            <form action="" className="flex flex-col gap-7">
              <FormInput
                label={"Name"}
                name={"name"}
                placeholder={"John Doe"}
                value={form.name}
                onChange={onChange}
              />
              <FormInput
                label={"Email"}
                name={"email"}
                placeholder={"johndoe@mail.com"}
                value={form.email}
                onChange={onChange}
              />
              <FormInput
                label={"Password"}
                placeholder={"·········"}
                type={"Password"}
                name={"password"}
                value={form.password}
                onChange={onChange}
              />
            </form>
            <div className="flex flex-col gap-3">
              <button
                onClick={registerSubmit}
                className="bg-[#9e0c49] rounded-full h-12 w-full text-white"
              >
                Sign Up
              </button>
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-black" />
                <span className="flex-shrink px-5 text-bborder-black">or</span>
                <div className="flex-grow border-t border-black" />
              </div>
              <button
                onClick={toLogin}
                className="bg-white rounded-full h-12 w-full"
              >
                Have Account? Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
