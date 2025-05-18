import type { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/txtSlicer";
import Image from "./Image";
import Button from "./ui/Button"
type Props ={
  product : IProduct
}
const ProductCard = ({product}: Props) => {
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 rounded-md border-1 border-gray-300 m-5 p-3 flex flex-col gap-3">
      <Image imgURL={product.imageURL} altText={product.title} className="rounded-md mb-2"/>
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-sm font-light text-gray-600 mb-[15px]">{txtSlicer(product.description)}</p>

      <div className="flex space-x-2">
      <div className="bg-red-500 h-5 w-5 rounded-[50%] cursor-pointer"></div>
      <div className="bg-yellow-500 h-5 w-5 rounded-[50%] cursor-pointer"></div>
      <div className="bg-blue-500 h-5 w-5 rounded-[50%] cursor-pointer"></div>
      </div>

      <div className="flex justify-between items-center my-4">
        <p className="text-md">${product.price}</p>
        <Image imgURL={product.category.imageURL} altText={product.category.name} className="h-10 w-10 cursor-pointer rounded-full object-bottom"/>
      </div>

    <div className="flex items-center justify-content-center space-x-2" >
      <Button width="w-full" onClick={()=>console.log("edit")} className="bg-indigo-700 ">Edit</Button>
      <Button width="w-full" onClick={()=>console.log("Delete")} className="bg-red-700">Delete</Button>
    </div>

    </div>
  )
};

export default ProductCard;