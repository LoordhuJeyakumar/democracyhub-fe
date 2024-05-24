import instance from "./instance";

let API_URL_ENDPOINT = "/localIssues/";

const localIssuesService = {
  getAllIssuesDetails: async () => {
    try {
      const response = instance.authInstance.get(API_URL_ENDPOINT);

      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default localIssuesService;
