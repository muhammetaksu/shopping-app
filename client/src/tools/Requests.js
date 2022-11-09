import axios from "axios";
import { API_URL } from "../env/config";

export const getRequest = async (path, token) => {
    const response = await axios.get(API_URL + `/${path}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
export const getSingleRequest = async (path, id, token) => {
    const response = await axios.get(API_URL + `/${path}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
export const postRequest = async (path, value, token) => {
    const response = await axios.post(API_URL + `/${path}`, value, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
export const updateRequest = async (path, value, token) => {
    const response = await axios.put(API_URL + `/${path}`, value, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
