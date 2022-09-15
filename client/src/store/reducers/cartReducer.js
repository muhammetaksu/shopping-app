export const cartReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_PRODUCT_TO_CART":
            return (state = [action.payload, ...state]);
        case "REMOVE_PRODUCT_FROM_CART":
            return (state = state.filter((q) => q.id != action.payload.id));
        case "REMOVE_ALL_PRODUCTS":
            return (state = []);
        case "SET_LOCAL_CART":
            return (state = action.payload);
        case "SET_CART_QUANTITY":
            return (state = action.payload);
        default:
            return state;
    }
};
