import { toast } from "react-toastify";
import instance from "./instance";

const API_ENDPOINT = "/candidates/";
const candidatesService = {
  getAllCandidates: async () => {
    try {
      const response = await instance.authInstance.get(API_ENDPOINT);
      return response;
    } catch (error) {
      toast.error(error.message);
      console.error("internal server error from candidatesService", error);
      return error;
    }
  },
};

export default candidatesService;
