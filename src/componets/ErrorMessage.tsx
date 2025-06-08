import type { HTMLAttributes } from "react";

interface Props  extends HTMLAttributes<HTMLSpanElement>{
 msg: string
}
const ErrorMessage = ({msg , ...rest}: Props) => {
  return (
    msg ? <span {...rest} className="text-red-700 black font-semibold text-sm">{msg}</span> : null
  )
};

export default ErrorMessage;