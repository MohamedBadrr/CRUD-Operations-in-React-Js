import type { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/txtSlicer";
import Image from "./Image";
import Button from "./ui/Button";
type Props = {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  setIsEditOpen: (isOpen: boolean) => void;
  setIndexEdit: (index: number) => void;
  setEditTempColors: (colors: string[]) => void;
  index: number;
  setIsCloseOpen: (isOpen: boolean) => void;
  setIsDetailsOpen :(isOpen : boolean) => void;
};
const ProductCard = ({ product, setProductToEdit, setIsEditOpen , setIndexEdit , setEditTempColors , index , setIsCloseOpen , setIsDetailsOpen}: Props) => {
  function editProduct() {
    setProductToEdit(product);
    setIsEditOpen(true);
    setIndexEdit(index)
    console.log(index);
    setEditTempColors(product.colors);
    
  }

  const handleDelete = () => {
    setIsCloseOpen(true);
    console.log("Delete product", product.id);
    setIndexEdit(index)
    
  }

  const handleDetails = ()=>{
    setIndexEdit(index);
setIsDetailsOpen(true) ; 
  }
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 rounded-md border-1 border-gray-300 m-5 p-3 flex flex-col gap-3">
      <Image
        imgURL={product.imageURL}
        altText={product.title}
        className="rounded-md mb-2 h-[210px] cursor-pointer"
        onClick={handleDetails}
      />
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-sm font-light text-gray-600 mb-[15px]">
        {txtSlicer(product.description)}
      </p>

      <div className="flex space-x-2">
        {product.colors.length > 0 ?
        product.colors.map((color) => (
          <div
            style={{ backgroundColor: color }}
            className="h-5 w-5 rounded-[50%] cursor-pointer"
          ></div>
        )) : <p className="text-gray-700 ">No colors available.</p>
        }
      </div>

      <div className="flex justify-between items-center my-4">
        <p className="text-md text-black font-semibold">${product.price}</p>
       <div className="flex items-center justify-center gap-2"> 
         <p className="text-sm text-black">{product.category.name}</p>
        <Image
          imgURL={product.category.imageURL}
          altText={product.category.name}
          className="h-10 w-10 cursor-pointer rounded-full object-bottom"
        />
        </div>
      </div>

      <div className="flex items-center justify-content-center space-x-2">
        <Button
          width="w-full"
          onClick={() => editProduct()}
          className="bg-indigo-700 "
        >
          Edit
        </Button>
        <Button
          width="w-full"
          onClick={() => handleDelete()}
          className="bg-red-700"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
