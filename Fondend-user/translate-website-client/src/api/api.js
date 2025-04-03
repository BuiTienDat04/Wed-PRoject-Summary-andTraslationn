import axios from "axios";

const API_BASE_URL = "https://api.pdfsmart.online"; // Export API_BASE_URL

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("loggedInUser");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export { API_BASE_URL }; // Export API_BASE_URL
export default api;