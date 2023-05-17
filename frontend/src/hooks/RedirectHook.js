import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import AuthService from "../services/AuthService";

const RedirectLoggedoutUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function loggedinStatus() {
      
      const isLoggedIn = await AuthService.loggedin();      

      if (isLoggedIn && isLoggedIn.loggedin === true) {
        return;
      }else{
        toast.info("Session expired, please login to continue.");
        await AuthService.logout();
        return navigate('/login');
      }
    }

    loggedinStatus();
  }, [navigate]);
};

export default RedirectLoggedoutUser;
