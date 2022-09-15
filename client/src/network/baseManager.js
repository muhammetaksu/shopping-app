import axios from "axios";
import { API_URL } from "../env/config";

export const baseManager = {
    getAll: async (url) => {
        let responseData = [];

        await axios.get(API_URL + url).then((res) => {
            responseData = res.data;
        });

        return responseData;
    },

    getSingleProduct: async (url, id) => {
        let responseData = [];

        await axios.get(API_URL + url).then((res) => {
            responseData = res.data;
        });

        return responseData;
    },

    delete: async (url, id) => {
        await axios.delete(API_URL + url + id);
    },
    add: async (url, data) => {
        let responseData = {};

        await axios.post(API_URL + url, data).then((res) => {
            responseData = res.data;
        });

        return responseData;
    },
};
