import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const api = axios.create({
  baseURL: "https://paywise-backend-3-vvro.onrender.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const checkEmailExists = async ({ email }) => {
  try {
    const response = await api.post("users/email", { email });
    return response.data.exists;
  } catch (error) {
    return false;
  }
};

export { api, checkEmailExists };
