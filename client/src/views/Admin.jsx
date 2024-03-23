import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useState } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:2024";
import { toast } from "react-toastify";

export default function Admin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    credit: "",
  });
  function onChange(event) {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  }
  async function clientSubmit() {
    try {
      const { data } = await axios.post(`${BASE_URL}/addClient`, form);
      console.log(data.response);
      toast.success("Add Client Success !");
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#ede6e9] h-[70vh] w-96 rounded-lg shadow-2xl drop-shadow-2xl flex justify-center">
          <div className="w-[90%] p-10 flex flex-col gap-7">
            <h1 className="self-center font-bold text-2xl text-[#9e0c49]">
              REGISTER CLIENT
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
                type={"email"}
                value={form.email}
                onChange={onChange}
              />
              <FormInput
                label={"Phone"}
                placeholder={"+6285XXXXX"}
                name={"phone"}
                value={form.phone}
                type={"tel"}
                onChange={onChange}
              />
              <FormInput
                label={"Credit"}
                placeholder={"0"}
                name={"credit"}
                type={"number"}
                value={form.credit}
                onChange={onChange}
              />
              <div className="flex flex-col gap-3">
                <button
                  onClick={clientSubmit}
                  className="bg-[#9e0c49] rounded-full h-12 w-full text-white"
                >
                  Add Client 💰
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
