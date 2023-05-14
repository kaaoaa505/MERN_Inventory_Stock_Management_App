import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/Auth/AuthSlice";

export const ShowIfLoggedin = ({ children }) => {
  const isLoggedin = useSelector(selectIsLoggedIn);

  if (isLoggedin) {
    return <>{children}</>;
  }

  return null;
};

export const HideIfLoggedin = ({ children }) => {
  const isLoggedin = useSelector(selectIsLoggedIn);

  if (!isLoggedin) {
    return <>{children}</>;
  }

  return null;
};
