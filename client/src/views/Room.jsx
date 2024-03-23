import FormInput from "../components/FormInput";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const BASE_URL = "http://localhost:2024";
import { toast } from "react-toastify";

export default function Room() {
  const { id } = useParams();
  const navigate = useNavigate;
  const [room, setRoom] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
  });
  function onChange(event) {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  }
  async function fetchRoom() {
    try {
      const { data } = await axios.get(`${BASE_URL}/rooms/${id}`);
      setRoom(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  async function bookingSubmit() {
    try {
      const access_token = localStorage.access_token;
      console.log(form);
      const { data } = await axios.post(`${BASE_URL}/booking/${id}`, form, {
        headers: { access_token: access_token },
      });
      toast.success("Booking Success !");
      setForm({
        name: "",
        email: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchRoom();
  }, []);
  return (
    <div className="flex justify-center items-center pt-24">
      <div className="bg-[#ede6e9] rounded-lg shadow-2xl drop-shadow-2xl grid justify-center h-auto w-[370px] sm:w-[80vw] grid-cols-1 sm:grid-cols-2 sm:gap-4">
        <div className="flex flex-col gap-0">
          <div className="p-4 sm:pl-4 sm:pr-0">
            <div>
              <img src={room.imgURL} />
            </div>
          </div>
          <div className="p-4 w-[80%] sm:pl-4 self-center">
            <div className=" sm:w-full sm:pb-5 flex flex-col gap-1">
              <p className="text-center">Informasi Klien</p>
              <FormInput
                label={"Name"}
                placeholder={"John Doe"}
                name={"name"}
                value={form.value}
                onChange={onChange}
              />
              <FormInput
                label={"Email"}
                placeholder={"johndoe@mail.com"}
                name={"email"}
                value={form.value}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-0 items-center justify-center md:h-full relative">
          <div className=" p-4 w-[90%] md:w-[70%] md:absolute md:top-[50%] md:-translate-y-2/4">
            <div className=" sm:w-full flex flex-col gap-4 items-center">
              <p className="text-center">Booking Room</p>
              <FormInput
                label={"Booking Date"}
                placeholder={"John Doe"}
                name={"bookingDate"}
                type="date"
                value={form.bookingDate}
                onChange={onChange}
              />
              <div className="grid grid-cols-2 gap-4 w-full">
                <Dropdown
                  label={"Start Time"}
                  name={"startTime"}
                  value={form.startTime}
                  onChange={onChange}
                  disabled={form.bookingDate == "" ? true : false}
                  roomUsages={room.RoomUsages}
                  bookingDate={form.bookingDate}
                />
                <Dropdown
                  label={"End Time"}
                  name={"endTime"}
                  value={form.endTime}
                  onChange={onChange}
                  disabled={form.startTime == "" ? true : false}
                  roomUsages={room.RoomUsages}
                  bookingDate={form.bookingDate}
                  startTime={form.startTime}
                />
              </div>
              <button
                onClick={bookingSubmit}
                className="bg-pink-800 h-12 w-[80%] rounded-lg"
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
