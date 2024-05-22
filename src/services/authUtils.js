import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const authUtils = {
  isAuthenticated: function () {
    const navigate = useNavigate();
    try {
      const { accessToken: token, isLoggedIn, user, expiresAt } = localStorage;
      console.log(JSON.parse(expiresAt));
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
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }

      const decodedToken = jwt.decode(token);
      return decodedToken.role === "admin";
    } catch (error) {
      console.error("Error in isAdmin function: ", error);
      return false;
    }
  },
};

export default authUtils;
