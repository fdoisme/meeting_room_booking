import { useNavigate } from "react-router-dom";
import "./Card.css";
import React from "react";

export default function Card({ rooms }) {
  const navigate = useNavigate();
  const style = {
    backgroundImage: `url("${rooms.imgURL}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  function toBookRoom() {
    navigate(`/${rooms.id}`);
  }
  return (
    <div className="example-2 card">
      <div className="wrapper" style={style}>
        <div className="data">
          <div className="content">
            <div className="wrapper-content">
              <span className="room">{rooms.roomName}</span>
            </div>
            <div className="text">
              <span className="price">Price Start From</span>
              <span className="price">{`Rp ${rooms.costPerHour}/Hour*`}</span>
            </div>
            <button onClick={toBookRoom} className="button">
              <span className="book-now">Book now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
