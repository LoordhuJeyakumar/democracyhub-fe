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
};

export default userService;
