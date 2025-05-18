
type Props ={
    imgURL: string;
    altText: string;
    className? : string;
}
const Image = ({imgURL , altText , className}: Props) => {
  return (
    <img src={imgURL} alt={altText} className={className}/>
  )
};

export default Image;