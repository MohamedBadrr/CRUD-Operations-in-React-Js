import type { InputHTMLAttributes } from "react";

// interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({...rest}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...rest} className="h-[35px] p-3 shadow-md border-2 border-gray-500 focus:outline-indigo-500 focus:border-indigo-500 rounded-md" />
  );
};

export default Input;
