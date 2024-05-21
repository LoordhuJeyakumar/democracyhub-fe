const authUtils = {
  isAuthenticated: function () {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        return false;
      }

      /*  const expirationDate = new Date(decodedToken.exp * 1000);
      if (expirationDate < new Date()) {
        return false;
      }
 */
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
