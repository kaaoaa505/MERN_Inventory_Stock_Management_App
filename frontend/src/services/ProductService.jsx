import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const store = async(formData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/products/store`,
        formData
      );
  
      if (response.statusText === "OK") {
        toast.success("Product stored successfully.");
      }
  
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
  
      toast.error(message);
    }
}