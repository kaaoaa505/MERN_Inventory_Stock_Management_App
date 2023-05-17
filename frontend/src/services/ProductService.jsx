import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const store = async(formData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/products/store`,
        formData
      );
  
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
  
      toast.error(message);
    }
}

const index = async() => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/products/index`
      );

      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
  
      toast.error(message);
    }
}

const destroy = async(productId) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/products/destroy/${productId}`
      );

      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
  
      toast.error(message);
    }
}

const show = async(productId) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/products/show/${productId}`
      );

      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
  
      toast.error(message);
    }
}

const ProductService = {
  store,
  index,
  destroy,
  show,
};

export default ProductService;