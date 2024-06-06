import instance from "./instance";

const API_ENDPOINT = "/elections/";
const electionService = {
  createNewElection: async (electionObj) => {
    try {
      const response = await instance.protectedInstance.post(
        `${API_ENDPOINT}createElection`,
        electionObj
      );
      return response;
    } catch (error) {
      console.error("Internal server error from election service", error);
      return error;
    }
  },
};

export default electionService;
