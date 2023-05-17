import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "./ProductForm";

import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import RedirectLoggedoutUser from "../../hooks/RedirectHook";
import * as ProductSlice from "../../redux/Product/ProductSlice";
import { useEffect } from "react";

const ProductEdit = () => {
  RedirectLoggedoutUser();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(ProductSlice.selectIsLoading);

  const productEdit = useSelector(ProductSlice.selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(ProductSlice.showProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const productFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);

    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    await dispatch(ProductSlice.updateProduct({ id, formData }));
    await dispatch(ProductSlice.getProducts());
    navigate("/dashboard");
  };

  return (
    <div className="ProductEditComponent">
      <Sidebar>
        <Layout>
          <h3 className="--mt">Add New Product</h3>

          <ProductForm
            product={product}
            productImage={productImage}
            productImagePreview={imagePreview}
            productDescription={description}
            setProductDescription={setDescription}
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

export default ProductEdit;
