import type { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement>{
    imgURL: string;
    altText: string;
    className? : string;
}
const Image = ({imgURL , altText , className , ...rest}: Props) => {
  return (
    <img {...rest} src={imgURL} alt={altText} className={className} />
  )
};

export default Image;