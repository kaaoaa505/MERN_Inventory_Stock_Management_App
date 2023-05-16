import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/Auth/AuthSlice";

export const ShowIfLoggedin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};

export const HideIfLoggedin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};
