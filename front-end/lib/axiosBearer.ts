import axios from "axios";
import { signOut } from "next-auth/react";

const BASE_URL = "http://localhost:8080";

const axiosBearer = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosBearer.interceptors.response.use(
  (response) => response,
  async (error) => {
    if ((error.response && error.response.status === 401)) {
      await signOut({ redirect: true, callbackUrl: "/login" });
    }
    return Promise.reject(error);
  }
);

export default axiosBearer;
