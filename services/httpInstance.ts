import axios from "axios";
import { API_URL } from ".";

const httpInstance = axios.create({
    baseURL: API_URL,
})

export default httpInstance;