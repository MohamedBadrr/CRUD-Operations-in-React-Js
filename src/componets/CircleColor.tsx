interface Props extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
}
const CircleColor = ({ color, ...rest }: Props) => {
  return (
    <div
      {...rest}
      className=" mb-1 h-5 w-5 rounded-[50%] cursor-pointer"
      style={{ backgroundColor: `${color}` }}
    ></div>
  );
};

export default CircleColor;
