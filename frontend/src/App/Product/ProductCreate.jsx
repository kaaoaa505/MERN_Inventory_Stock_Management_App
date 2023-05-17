import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductForm from "./ProductForm";

import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import RedirectLoggedoutUser from "../../hooks/RedirectHook";
import * as ProductSlice from "../../redux/Product/ProductSlice";

const initialProduct = {
  name: "",
  category: "",
  quantity: 0,
  price: 1,
  description: "",
};

const ProductCreate = () => {
  RedirectLoggedoutUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialProduct);
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);

  const isLoading = useSelector(ProductSlice.selectIsLoading);

  const { name, category, quantity, price } = product;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setProductImage(event.target.files[0]);
    setProductImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const generateSku = (category) => {
    const first3Letters = category.slice(0, 3).toUpperCase();
    const now =
      Date.now() + Math.floor(Math.random() * (9998 - 1000 + 1) + 1000);
    return first3Letters + "-" + now;
  };

  const productFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSku(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", productDescription ?? "");

    dispatch(ProductSlice.storeProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div className="ProductCreateComponent">
      <Sidebar>
        <Layout>
          <h3 className="--mt">Add New Product</h3>

          <ProductForm
            product={product}
            productImage={productImage}
            productImagePreview={productImagePreview}
            productDescription={productDescription}
            setProductDescription={setProductDescription}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            productFormSubmit={productFormSubmit}
            isLoading={isLoading}
          />
        </Layout>
      </Sidebar>
    </div>
  );
};

export default ProductCreate;
