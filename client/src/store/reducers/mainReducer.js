import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import {
    originalProductsReducer,
    productsReducer,
    filteredProductsReducer,
    getProductByIdReducer,
    categoriesReducer,
    suppliersReducer,
} from "./dataReducer.js";
import { favoritesReducer } from "./favoritesReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
    cartReducer,
    favoritesReducer,
    originalProductsReducer,
    productsReducer,
    filteredProductsReducer,
    getProductByIdReducer,
    categoriesReducer,
    suppliersReducer,
    userReducer,
});
