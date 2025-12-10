import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
}

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const handleAxiosError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        return err.response?.data?.message || err.message;
    } else if (err instanceof Error) {
        return err.message;
    } else {
        return "Unexpected error";
    }
};

export default api;