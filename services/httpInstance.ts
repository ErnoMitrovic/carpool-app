import axios from "axios";
import { API_URL } from ".";
import { getAuth } from "firebase/auth";

/**
 * Create an instance of axios with base URL and headers
 */
const httpInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

/**
 * Add Authorization header to every request
 */
httpInstance.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const idToken = await user.getIdToken();
        config.headers['Authorization'] = `Bearer ${idToken}`;
    }
    return config;
}, (error) => {
    console.error('Request error', error);
    return Promise.reject(error);
});

export default httpInstance;