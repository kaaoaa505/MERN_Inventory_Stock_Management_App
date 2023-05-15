import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./ProductForm.scss";

import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";

const ProductForm = ({
  product,
  productImage,
  productImagePreview,
  productDescription,
  setProductDescription,
  handleInputChange,
  handleImageChange,
  productFormSubmit,
  isLoading,
}) => {
  return (
    <div className="ProductFormComponent">
      {isLoading && <Loading />}

      <Card className="card">
        <form onSubmit={productFormSubmit}>
          <Card className="group">
            <label htmlFor="image">Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, and png.
            </code>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(event) => handleImageChange(event)}
            />
            {productImagePreview !== null ? (
              <div className="image-preview">
                <img src={productImagePreview} alt="" />
              </div>
            ) : (
              <p>No image to preview yet.</p>
            )}
            {productImage !== null && (
              <div className="image-preview">
                <img src={productImage} alt="" />
              </div>
            )}
          </Card>

          <Card className="group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product?.name}
              onChange={(event) => handleInputChange(event)}
            />
          </Card>

          <Card className="group">
            <label htmlFor="category">Product Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product?.category}
              onChange={(event) => handleInputChange(event)}
            />
          </Card>

          <Card className="group">
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              step="0.01"
              id="price"
              name="price"
              value={product?.price}
              onChange={(event) => handleInputChange(event)}
            />
          </Card>

          <Card className="group">
            <label htmlFor="quantity">Product Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product?.quantity}
              onChange={(event) => handleInputChange(event)}
            />
          </Card>

          <Card className="group">
            <label htmlFor="description">Product Description</label>
            <ReactQuill
              id="description"
              theme="snow"
              modules={ProductForm.modules}
              formats={ProductForm.formats}
              value={productDescription}
              onChange={setProductDescription}
            />
          </Card>

          <Card className="group">
            <button type="submit" className="--btn --btn-primary">
              Save
            </button>
          </Card>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
