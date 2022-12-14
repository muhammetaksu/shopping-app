import { API_URL } from "../../env/config";
import { setLocalCart, setLocalFavorites } from "../actions/mainActions";
import axios from "axios";
import { cartStorage } from "../../service/localStorage/cartStorage";
import { favoriteStorage } from "../../service/localStorage/favoriteStorage";

export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: "GET_PRODUCTS_REQUEST" });

    try {
        const response = await axios.get(`${API_URL}products`);
        dispatch({ type: "GET_PRODUCT_SUCCESS", payload: response.data });
        dispatch({ type: "GET_ORIGINAL_PRODUCT_SUCCESS", payload: response.data });
        dispatch({ type: "GET_FILTERED_PRODUCT_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_PRODUCT_ERROR", payload: error });
        dispatch({ type: "GET_ORIGINAL_PRODUCT_ERROR", payload: error });
        dispatch({ type: "GET_FILTERED_PRODUCT_ERROR", payload: error });
    }
};

export const fetchCategories = () => async (dispatch) => {
    dispatch({ type: "GET_CATEGORIES_REQUEST" });
    try {
        const response = await axios.get(`${API_URL}categories`);
        dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_CATEGORIES_ERROR", error });
    }
};

export const fetchSuppliers = () => async (dispatch) => {
    dispatch({ type: "GET_SUPPLIERS_REQUEST" });
    try {
        const response = await axios.get(`${API_URL}suppliers`);
        dispatch({ type: "GET_SUPPLIERS_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_SUPPLIERS_ERROR", payload: error });
    }
};

export const fetchCartLocalStorage = () => {
    return async (dispatch) => {
        const localCart = await cartStorage.getCart();

        await dispatch(setLocalCart(localCart));
    };
};

export const fetchFavLocalStorage = () => {
    return async (dispatch) => {
        const localFav = await favoriteStorage.getFav();

        await dispatch(setLocalFavorites(localFav));
    };
};
