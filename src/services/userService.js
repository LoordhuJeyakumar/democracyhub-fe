import { toast } from "react-toastify";
import instance from "./instance";


const userService = {
  register: async (userData) => {
    try {
      const response = await instance.authInstance.post("users", userData);
      return response;
    } catch (error) {
      console.error(error);

      return error;
    }
  },
  login: async (userData) => {
    try {
      const response = await instance.authInstance.post(
        "users/login",
        userData
      );
      if (response?.data?.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem(
          "expiresAt",
          Date.now() + response.data.expiresIn * 1000
        );
      }
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  verifyToken: async (verifyToken, userId) => {
    try {
      const response = await instance.authInstance.get(
        `users/verify/${userId}/${verifyToken}`
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  resetToken: async (resetToken, userId) => {
    try {
      const response = await instance.authInstance.get(
        `users/resetPassword/${userId}/${resetToken}`
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  sendVerificationLink: async (email) => {
    try {
      const emailObj = { email: email };
      const response = await instance.authInstance.post(
        "users/sendVerificationLink",
        emailObj
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  sendResetLink: async (email) => {
    try {
      const emailObj = { email: email };
      const response = await instance.authInstance.post(
        "users/resetPasswordLink",
        emailObj
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  resetPassword: async (passswordObj, userId) => {
    try {
      const response = await instance.authInstance.post(
        `/users/resetPassword/${userId}`,
        passswordObj
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getUserDetails: async (id) => {
    try {
      const response = await instance.protectedInstance.get(`/users/${id}`);

      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateUserDetails: async (id, updateObj) => {
    try {
      const response = await instance.protectedInstance.put(
        `/users/${id}`,
        updateObj
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getAllusers: async (page = 1, limit = 10) => {
    try {
      /* const response = await instance.protectedInstance(
        `users?page=${page}&limit=${limit}`
      ); */
      const response = await instance.protectedInstance(`users`);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  deleteUserByAdmin: async (userId) => {
    try {
      const response = await instance.protectedInstance.delete(
        `/users/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error from userService", error);
      return error;
    }
  },
  deleteUserByUser: async (userId) => {
    try {
      const response = await instance.protectedInstance.delete(
        `/users/delete/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error from userService", error);
      return error;
    }
  },
  deActivateUserByAdmin: async (userId) => {
    try {
      const response = await instance.protectedInstance.put(
        `/users/deactivate/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error from userService", error);
      return error;
    }
  },
  deActivateUserByUser: async (userId) => {
    try {
      const response = await instance.protectedInstance.put(
        `/users/deactivate/user/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error from userService", error);
      return error;
    }
  },
  activateUserByAdmin: async (userId) => {
    try {
      const response = await instance.protectedInstance.put(
        `/users/activate/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error from userService", error);
      return error;
    }
  },
  changePassword: async (userId, changePasswordObj) => {
    try {
      const response = await instance.protectedInstance.post(
        `/users/changePassword/${userId}`,
        changePasswordObj
      );
      return response;
    } catch (error) {
      console.error("Internal Error from userService", error);
      return error;
    }
  },
};



export default userService;
