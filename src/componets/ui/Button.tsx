import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    className? : string;
    children:ReactNode
    width?: "w-full" | "w-fit"
}
const Button = ({children , className , width , ...rest}: Props) => {
  return (
    <button className={`${className} ${width} text-white rounded-md w-full p-2 cursor-pointer`} {...rest}>{children}</button>
  )
};

export default Button;