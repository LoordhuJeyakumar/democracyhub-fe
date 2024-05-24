import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const authUtils = {
  isAuthenticated: function () {
    const navigate = useNavigate();
    try {
      const { accessToken: token, isLoggedIn, user, expiresAt } = localStorage;
      if (!token) {
        return false;
      }

      if (expiresAt < new Date()) {
        toast.error("session expired please log-in again");
        navigate("/login");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in isAuthenticated function: ", error);
      return false;
    }
  },

  isAdmin: function () {
    try {
     
      const { accessToken: token, isLoggedIn, user, expiresAt } = localStorage;
      let parsedUser;
      if (user) {
        parsedUser = JSON.parse(user);
      }
      if (!token) {
        return false;
      }

      if (isLoggedIn) {
        return parsedUser.loggedInUser.isAdmin;
      }
      return false;
     
    } catch (error) {
      console.error("Error in isAdmin function: ", error);
      return false;
    }
  },
};

export default authUtils;
