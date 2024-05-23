export const config = {
  VITE_API_URL_LOCAL: import.meta.env.VITE_API_URL_LOCAL,
  VITE_API_URL_CLOUD: import.meta.env.VITE_API_URL_CLOUD,
  VITE_IS_DEPLOYED: import.meta.env.VITE_IS_DEPLOYED,
};
console.log(
  config.VITE_API_URL_CLOUD,
  config.VITE_API_URL_LOCAL,
  config.VITE_IS_DEPLOYED
);