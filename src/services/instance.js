import axios from "axios";
import { config } from "../utils/config";

let isDeployed = config.VITE_IS_DEPLOYED === "true";
let baseURL = isDeployed
  ? config.VITE_API_URL_CLOUD
  : config.VITE_API_URL_LOCAL;

const authInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});



const protectedInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


protectedInstance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


export default { authInstance, protectedInstance, baseURL };
