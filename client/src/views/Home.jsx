import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
const BASE_URL = "http://localhost:2024";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  async function fetchRooms() {
    try {
      const { data } = await axios.get(`${BASE_URL}/rooms`);
      //   console.log(data);
      setRooms(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchRooms();
  }, []);
  return (
    <div className="w-full h-full pt-32 flex justify-center items-center">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-7 pb-6">
        {rooms.map((el) => {
          return <Card rooms={el} key={el.id} />;
        })}
      </div>
    </div>
  );
}
