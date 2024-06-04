import instance from "./instance";

const API_ENDPOINT = "/constituencies/";
const constituenciesService = {
  getAllconstituencies: async () => {
    try {
      const response = await instance.authInstance.get(API_ENDPOINT);
      return response;
    } catch (error) {
      console.error("internal server error from constituenciesService", error);
      return error;
    }
  },
};

export default constituenciesService;
