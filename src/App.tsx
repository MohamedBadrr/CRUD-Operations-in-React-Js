import { useState, type ChangeEvent } from "react";
import "./App.css";
import ProductCard from "./componets/ProductCard";
import Modal from "./componets/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./componets/ui/Button";
import Input from "./componets/ui/Input";
import type { IProduct } from "./interfaces";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [product , setProduct] = useState<IProduct>({
    title:'',
    description : '',
    imageURL:"",
    price:'', 
    category:{
      name:'',
      imageURL:""
    },
    colors:[]
  })

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
    const {name , value} = e.target;
    setProduct({
      ...product,
      [name]:value
    })
  }


  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <div className="px-[1rem] md:px-[8rem]">
      <div className="w-full mt-[40px] px-4 flex items-center justify-between">
        <div>
          <span className="text-[30px] font-bold justify-between text-indigo-700">
            Latest <span className="text-black">Projects</span>
          </span>
        </div>
        <Button
          onClick={open}
          className="bg-indigo-700 hover:bg-indigo-900 transition-all duration-300 !w-[100px]"
        >
          Add New 
        </Button>
      </div>
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
        {productList.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
        <Modal close={close} title="Add a New Product" isOpen={isOpen}>
          <form className="w-full flex gap-[15px] flex-col">
              {formInputsList.map((input)=>{
                  return <div className="flex flex-col gap-2">
                      <label htmlFor={input.label}>{input.label}<span className="text-red-500">*</span></label>
                      <Input value={product[input.name]} onChange={changeHandler} id={input.name} name={input.name} type={input.type} />
                  </div>
              })}
            <div>

            </div>
            
            <Button
              onClick={open}
              className="bg-indigo-700 hover:bg-indigo-900 transition-all duration-300 !w-[100%]"
            >
              Submit
            </Button>
            <Button
              onClick={close}
              className="bg-gray-300 !text-black hover:!text-white hover:bg-gray-900 transition-all duration-300 !w-[100%]"
            >
              Cancel
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default App;
