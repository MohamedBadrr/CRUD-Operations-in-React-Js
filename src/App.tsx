import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";
import ProductCard from "./componets/ProductCard";
import Modal from "./componets/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./componets/ui/Button";
import Input from "./componets/ui/Input";
import type { IProduct } from "./interfaces";
import { productValidationSchema } from "./validations/productValidation";
import ErrorMessage from "./componets/ErrorMessage";
import CircleColor from "./componets/CircleColor";
import Select from "./componets/ui/Select";

function App() {
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
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCloseOpen, setIsCloseOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(initialProduct);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [productToEdit, setProductToEdit] = useState<IProduct>(initialProduct);
  const [indexEdit, setIndexEdit] = useState<number>(0);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [editTempColors, setEditTempColors] = useState<string[]>(
    productToEdit.colors
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const changeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
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

  function closeEdit() {
    setIsEditOpen(false);
  }

  const cancelHandler = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(false);
    setProduct(initialProduct);
  };

  const cancelEditHandler = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditOpen(false);
    setProduct(productToEdit);
    // setTempColors(productToEdit.colors);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // console.log("Submitted Product: ", product);
    const errors = productValidationSchema({
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
      title: product.title,
      colors: tempColors,
    });
    const hasErrors = Object.values(errors).some((error) => error !== "");
    // console.log(hasErrors);
    if (hasErrors) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      { ...product, colors: tempColors, category: selectedCategory },
      ...prev,
    ]);
    setProduct(initialProduct);
    setIsOpen(false);
  };

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("Submitted Product: ", product);
    const errors = productValidationSchema({
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
      price: productToEdit.price,
      title: productToEdit.title,
      colors: editTempColors,
    });
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[indexEdit] = {
      ...productToEdit,
      colors: editTempColors,
      category: selectedCategory,
    };
    setProducts(updatedProducts);
    console.log("Done");

    setIsEditOpen(false);
  };

  const closeRemoveModal = () => {
    setIsCloseOpen(false);
  };

  const handleDelete = () => {
    setProducts((prev) => prev.filter((_, index) => index !== indexEdit));
    setIsCloseOpen(false);
    console.log("Delete product", products);
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
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <ProductCard
                setIsEditOpen={setIsEditOpen}
                key={product.id}
                product={product}
                setProductToEdit={setProductToEdit}
                setIndexEdit={setIndexEdit}
                index={products.indexOf(product)}
                setEditTempColors={setEditTempColors}
                setIsCloseOpen={setIsCloseOpen}
              />
            );
          })
        ) : (
          <div className="col-span-4 text-center font-bold text-[30px] text-indigo-700 h-[85vh] flex items-center justify-center">
            There are no products available add new one.
          </div>
        )}
        {/* Add Model */}
        <Modal close={close} title="Add a New Product" isOpen={isOpen}>
          <form
            className="w-full flex gap-[10px] flex-col"
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
            <span className="block text-sm/6 font-medium text-gray-900 mb-[-10px]">
              Colors
            </span>
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
                      if (tempColors.length !== 0) {
                        setErrors((cur) => ({ ...cur, colors: "" }));
                      }
                      return;
                    }
                    if (tempColors.length !== 0) {
                      setErrors((cur) => ({ ...cur, colors: "" }));
                    }
                    setTempColors((prev) => [...prev, color]);
                  }}
                />
              ))}
            </div>

            <div className="flex space-x-2 flex-wrap mb-2">
              {tempColors.map((color) => (
                <span
                  className="p-1 mb-1 text-white mr-1 text-xs rounded-md w-fit"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              ))}
              {tempColors.length === 0 && <ErrorMessage msg={errors.colors} />}
            </div>
            <Select
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
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

        {/* update model  */}

        <Modal close={closeEdit} title="Edit Product" isOpen={isEditOpen}>
          <form
            className="w-full flex gap-[15px] flex-col"
            onSubmit={submitEditHandler}
          >
            {formInputsList.map((input) => {
              return (
                <div className="flex flex-col gap-2">
                  <label htmlFor={input.label}>
                    {input.label}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={productToEdit[input.name]}
                    onChange={changeEditHandler}
                    id={input.name}
                    name={input.name}
                    type={input.type}
                  />
                  <ErrorMessage msg={errors[input.name]} />
                </div>
              );
            })}
            <span className="block text-sm/6 font-medium text-gray-900 mb-[-10px]">
              Colors
            </span>

            <div className="flex space-x-2 flex-wrap">
              {colors.map((color) => (
                <CircleColor
                  key={color}
                  color={color}
                  onClick={() => {
                    if (editTempColors.includes(color)) {
                      setEditTempColors((prev) =>
                        prev.filter((item) => item !== color)
                      );
                      if (editTempColors.length !== 0) {
                        setErrors((cur) => ({ ...cur, colors: "" }));
                      }
                      return;
                    }
                    if (editTempColors.length !== 0) {
                      setErrors((cur) => ({ ...cur, colors: "" }));
                    }
                    setEditTempColors((prev) => [...prev, color]);
                  }}
                />
              ))}
            </div>

            <div className="flex space-x-2 flex-wrap mb-2">
              {editTempColors.map((color) => (
                <span
                  className="p-1 mb-1 text-white mr-1 text-xs rounded-md w-fit"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              ))}
              {editTempColors.length === 0 && (
                <ErrorMessage msg={errors.colors} />
              )}
            </div>

            <Select
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
            <Button
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-900 transition-all duration-300 !w-[100%]"
            >
              Edit
            </Button>
            <Button
              onClick={cancelEditHandler}
              type="button"
              className="bg-gray-300 !text-black hover:!text-white hover:bg-gray-900 transition-all duration-300 !w-[100%]"
            >
              Cancel
            </Button>
          </form>
        </Modal>

        {/* Remove Model  */}
        <Modal close={closeRemoveModal} title="" isOpen={isCloseOpen}>
          <div className="flex items-center justify-center flex-col">
            <p className="mt-[-20px] mb-[20px] text-[25px] font-semibold">
              Delete Product
            </p>
            <p className="text-sm/6 text-gray-600 mt-[-10px] ">
              Are you sure you want to delete this product?
            </p>
            <div className="flex space-x-2 mt-4">
              <Button
                onClick={handleDelete}
                className="bg-red-700 hover:bg-red-900 transition-all duration-300 !w-[100px]"
              >
                Delete
              </Button>
              <Button
                onClick={closeRemoveModal}
                className="bg-gray-300 !text-black hover:!text-white hover:bg-gray-900 transition-all duration-300 !w-[100px]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
