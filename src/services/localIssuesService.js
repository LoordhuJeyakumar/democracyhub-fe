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
  getIssueById: async (localIssueId) => {
    try {
      const response = await instance.protectedInstance.get(
        `${API_URL_ENDPOINT}${localIssueId}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  upVoteIssue: async (localIssueId) => {
    try {
      const response = await instance.protectedInstance.put(
        `${API_URL_ENDPOINT}upVote/${localIssueId}`
      );
      
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  downVoteIssue: async (localIssueId) => {
    try {
      const response = await instance.protectedInstance.put(
        `${API_URL_ENDPOINT}downVote/${localIssueId}`
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

export default localIssuesService;
