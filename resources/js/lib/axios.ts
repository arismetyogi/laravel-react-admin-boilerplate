import axios from "axios";
// Create an Axios instance

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL || "http://localhost", // Replace with your app's URL
  withCredentials: true, // Include cookies in requests
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default axiosInstance;
