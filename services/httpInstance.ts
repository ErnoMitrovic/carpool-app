import axios from "axios";
import { API_URL } from ".";
import { getAuth } from "firebase/auth";

const httpInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

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