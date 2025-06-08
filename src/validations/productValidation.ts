export const productValidationSchema = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Title must be between 10 and 80 characters.";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = "description must be between 10 and 900 characters.";
  }
  if (
    !product.imageURL.trim() ||
    !/^https?:\/\//.test(product.imageURL)
  ) {
    errors.imageURL = "Image URL must be a valid URL";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Price must be a valid number.";
  }

  if(product.colors.length === 0) {
    errors.colors = "At least one color must be selected.";
  }

  return errors;
};
