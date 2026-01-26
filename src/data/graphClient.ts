import axios from "axios";

export const graphqlClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/graphql`,
  headers: {
    "Content-Type": "application/json",
  },
});

graphqlClient.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_API_TOKEN_SALT;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
