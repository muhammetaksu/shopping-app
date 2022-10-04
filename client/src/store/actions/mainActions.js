// FILTERED PRODUCTS
export const changeProductsFiltered = (payload) => {
    return {
        type: "CHANGE_FILTERED_PRODUTCS",
        payload: payload,
    };
};
// FILTERED PRODUCTS
export const changeProductsData = (payload) => {
    return {
        type: "CHANGE_PRODUCTS_DATA",
        payload: payload,
    };
};

/* CART ACTIONS */
export const addProductToCart = (payload) => {
    return {
        type: "ADD_PRODUCT_TO_CART",
        payload: payload,
    };
};
export const removeProductFromCart = (payload) => {
    return {
        type: "REMOVE_PRODUCT_FROM_CART",
        payload: payload,
    };
};
export const removeAllProduct = () => {
    return {
        type: "REMOVE_ALL_PRODUCTS",
    };
};
export const setLocalCart = (payload) => {
    return {
        type: "SET_LOCAL_CART",
        payload: payload,
    };
};
export const setCartQuantity = (payload) => {
    return {
        type: "SET_CART_QUANTITY",
        payload: payload,
    };
};

/* FAVORITES ACTIONS */
export const addToFavorites = (payload) => {
    return {
        type: "ADD_TO_FAVORITES",
        payload: payload,
    };
};
export const removeFromFavorites = (payload) => {
    return {
        type: "REMOVE_FROM_FAVORITES",
        payload: payload,
    };
};
export const removeAllFavorites = () => {
    return {
        type: "REMOVE_ALL_FAVORITES",
    };
};
export const setLocalFavorites = (payload) => {
    return {
        type: "SET_LOCAL_FAVORITES",
        payload: payload,
    };
};

//// BOOK DETAIL PAGE ACTIONS
export const clearGetProductById = () => {
    return {
        type: "CLEAR_GET_PRODUCT_BY_ID",
    };
};
export const clearSelectedCategory = () => {
    return {
        type: "CLEAR_SELECTED_CATEGORY",
    };
};
export const clearSelectedSupplier = () => {
    return {
        type: "CLEAR_SELECTED_SUPPLIER",
    };
};

/////// CURRENT USER ///////

export const setCurrentUser = (payload) => {
    return {
        type: "SET_CURRENT_USER",
        payload: payload,
    };
};
export const clearCurrentUser = () => {
    return {
        type: "CLEAR_CURRENT_USER",
    };
};
