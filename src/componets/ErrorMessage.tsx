type Props ={
 msg: string
}
const ErrorMessage = ({msg}: Props) => {
  return (
    msg ? <span className="text-red-700 black font-semibold text-sm">{msg}</span> : null
  )
};

export default ErrorMessage;