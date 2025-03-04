import axios from "axios";
import { API_URL } from ".";

const httpInstance = axios.create({
    baseURL: API_URL,
})

httpInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

export default httpInstance;