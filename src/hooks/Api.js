import axios from 'axios';


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,  // Ensure cookies are sent with every request
});