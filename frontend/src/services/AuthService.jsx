import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

export const register = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === "OK") {
      toast.success("Register was successful.");
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(message);
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === "OK") {
      toast.success("Login was successful.");
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(message);
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/logout`
    );

    if (response.statusText === "OK") {
      toast.success("Logout was successful.");
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(message);
  }
};

export const forgot = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/user/forgot`,
      userData
    );

    if (response.statusText === "OK") {
      toast.success("Reset email was sent successfully.");
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(message);
  }
};

export const reset = async (userData, token) => {

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/user/reset/${token}`,
      userData
    );

    if (response.statusText === "OK") {
      toast.success("Reset was successfully.");
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(message);
  }
};

export const loggedin = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/loggedin`
    );

    if (response.statusText === "OK") {
      return response.data.loggedin;
    }else{
      return false;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(message);
  }
}