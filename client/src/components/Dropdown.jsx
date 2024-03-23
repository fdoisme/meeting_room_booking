import { useState } from "react";

export default function Dropdown({
  label,
  name,
  value,
  onChange,
  disabled,
  roomUsages,
  bookingDate = null,
  startTime = null,
}) {
  const time24Hr = Array.from({ length: 24 }, (_, idx) => {
    const temp = idx + 1 < 0 ? `0${idx + 1}:00` : `${idx + 1}:00`;
    // console.log(startTime, temp);
    return {
      value: temp,
      disabled: startTime && startTime == temp ? true : false,
    };
  });
  const arrBooked =
    !roomUsages || roomUsages.length == 0
      ? null
      : roomUsages.filter((el) => el.bookingDate == bookingDate);
  let timeBooked = [];
  arrBooked?.map((el) => {
    const start = Number(el.startTime.slice(0, 2));
    const finish = Number(el.endTime.slice(0, 2));
    Array.from({ length: finish - start + 1 }, (_, idx) => idx + start).forEach(
      (el) => {
        if (el < 10) timeBooked.push(`0${String(el)}:00`);
        else timeBooked.push(`${String(el)}:00`);
      }
    );
  });
  time24Hr.map((el) => {
    timeBooked.includes(el.value) ? (el.disabled = true) : null;
    return el;
  });
  return (
    <div className="flex flex-col gap-1 w-full">
      <span>{label}</span>
      <select
        className="h-10 rounded-md pl-3"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option disabled value="">
          Select time
        </option>
        {time24Hr?.map((el) => {
          return (
            <option value={el.value} key={el.value} disabled={el.disabled}>
              {el.value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
