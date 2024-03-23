import { useEffect, useRef } from "react";

export default function FormInput({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  const inputRef = useRef();
  useEffect(() => {
    const date = new Date().toLocaleDateString("en-CA");
    inputRef.current.min = date;
  }, []);
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="h-10 rounded-md p-3"
        name={name}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </div>
  );
}
