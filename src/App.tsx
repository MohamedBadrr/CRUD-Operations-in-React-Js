import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";
import ProductCard from "./componets/ProductCard";
import Modal from "./componets/ui/Modal";
import { colors, formInputsList, productList } from "./data";
import Button from "./componets/ui/Button";
import Input from "./componets/ui/Input";
import type { IProduct } from "./interfaces";
import { productValidationSchema } from "./validations/productValidation";
import ErrorMessage from "./componets/ErrorMessage";
import CircleColor from "./componets/CircleColor";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const initialProduct: IProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    category: {
      name: "",
      imageURL: "",
    },
    colors: [],
  };
  const [product, setProduct] = useState<IProduct>(initialProduct);
  const [products , setProducts] = useState<IProduct[]>(productList);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  console.log(tempColors);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // console.log("Submitted Product: ", product);
    const errors = productValidationSchema({
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
      title: product.title,
    });
    const hasErrors = Object.values(errors).some((error) => error !== "");
    console.log(hasErrors);
    if (hasErrors) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [{ ...product, colors: tempColors },...prev]);
    setProduct(initialProduct);
    setIsOpen(false);
  };

  const cancelHandler = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(false);
    setProduct(initialProduct);
  };

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
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
        <Modal close={close} title="Add a New Product" isOpen={isOpen}>
          <form
            className="w-full flex gap-[15px] flex-col"
            onSubmit={submitHandler}
          >
            {formInputsList.map((input) => {
              return (
                <div className="flex flex-col gap-2">
                  <label htmlFor={input.label}>
                    {input.label}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={product[input.name]}
                    onChange={changeHandler}
                    id={input.name}
                    name={input.name}
                    type={input.type}
                  />
                  <ErrorMessage msg={errors[input.name]} />
                </div>
              );
            })}
            <div className="flex space-x-2 flex-wrap">
              {colors.map((color) => (
                <CircleColor
                  key={color}
                  color={color}
                  onClick={() => {
                    if (tempColors.includes(color)) {
                      setTempColors((prev) =>
                        prev.filter((item) => item !== color)
                      );
                      return;
                    }
                    setTempColors((prev) => [...prev, color]);
                  }}
                />
              ))}
            </div>

            <div className="flex space-x-2 flex-wrap">
              {tempColors.map((color) => (
                <span
                  className="p-1 mb-1 text-white mr-1 text-xs rounded-md w-fit"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              ))}
            </div>

            <Button
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-900 transition-all duration-300 !w-[100%]"
            >
              Submit
            </Button>
            <Button
              onClick={cancelHandler}
              type="button"
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
