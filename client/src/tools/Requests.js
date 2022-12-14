import axios from "axios";
import { API_URL } from "../env/config";

export const getRequest = async (path, token) => {
    const response = await axios.get(API_URL + path, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
export const getSingleRequest = async (path, id, token) => {
    const response = await axios.get(API_URL + path + "/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
export const getSingleRequestByUserId = async (path, id, token) => {
    const response = await axios.get(API_URL + path + "/userId/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
export const postRequest = async (path, value, token) => {
    try {
        const response = await axios.post(API_URL + path, value, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        return error;
    }
};
export const updateRequest = async (path, id, token, value) => {
    const response = await axios.put(API_URL + path + "/" + id, value, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const deleteRequest = async (path, id, token) => {
    const response = await axios.delete(API_URL + path + "/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
