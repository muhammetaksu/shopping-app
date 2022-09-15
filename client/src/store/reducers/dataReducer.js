export const originalProductsReducer = (state = { originalProducts: [] }, action) => {
    switch (action.type) {
        case "GET_ORIGINAL_PRODUCT_REQUEST":
            return {
                originalProductsLoading: true,
                ...state,
            };
        case "GET_ORIGINAL_PRODUCT_SUCCESS":
            return {
                originalProductsLoading: false,
                originalProducts: action.payload,
            };
        case "GET_ORIGINAL_PRODUCT_ERROR":
            return {
                originalProductsLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case "GET_PRODUCT_REQUEST":
            return {
                productsLoading: true,
                ...state,
            };
        case "GET_PRODUCT_SUCCESS":
            return {
                productsLoading: false,
                products: action.payload,
            };
        case "CHANGE_PRODUCTS_DATA":
            return {
                productsLoading: false,
                products: action.payload,
            };
        case "GET_PRODUCT_ERROR":
            return {
                productsLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const filteredProductsReducer = (state = { filteredProducts: [] }, action) => {
    switch (action.type) {
        case "GET_FILTERED_PRODUCT_REQUEST":
            return {
                filteredProductsLoading: true,
                ...state,
            };
        case "GET_FILTERED_PRODUCT_SUCCESS":
            return {
                filteredProductsLoading: false,
                filteredProducts: action.payload,
            };
        case "CHANGE_FILTERED_PRODUTCS":
            return {
                filteredProductsLoading: false,
                filteredProducts: action.payload,
            };
        case "GET_FILTERED_PRODUCT_ERROR":
            return {
                filteredProductsLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getProductByIdReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case "GET_PRODUCT_BY_ID_REQUEST":
            return {
                productByIdLoading: true,
                ...state,
            };
        case "GET_PRODUCT_BY_ID_SUCCESS":
            return {
                productByIdLoading: false,
                product: action.payload,
            };
        case "GET_PRODUCT_BY_ID_ERROR":
            return {
                productByIdLoading: false,
                error: action.payload,
            };
        case "CLEAR_GET_PRODUCT_BY_ID":
            return {
                productByIdLoading: false,
                product: [],
            };
        default:
            return state;
    }
};

export const categoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case "GET_CATEGORIES_REQUEST":
            return {
                categoriesLoading: true,
                ...state,
            };
        case "GET_CATEGORIES_SUCCESS":
            return {
                categoriesLoading: false,
                categories: action.payload,
            };
        case "GET_CATEGORIES_ERROR":
            return {
                categoriesLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const suppliersReducer = (state = { suppliers: [] }, action) => {
    switch (action.type) {
        case "GET_SUPPLIERS_REQUEST":
            return {
                suppliersLoading: true,
                ...state,
            };
        case "GET_SUPPLIERS_SUCCESS":
            return {
                suppliersLoading: false,
                suppliers: action.payload,
            };
        case "GET_SUPPLIERS_ERROR":
            return {
                suppliersLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const selectedSupplierReducer = (state = { selectedSupplier: [] }, action) => {
    switch (action.type) {
        case "SET_SELECTED_SUPPLIER_REQUEST":
            return {
                selectedSupplierLoading: true,
                ...state,
            };
        case "SET_SELECTED_SUPPLIER_SUCCESS":
            return {
                selectedSupplierLoading: false,
                selectedSupplier: action.payload,
            };
        case "SET_SELECTED_SUPPLIER_ERROR":
            return {
                selectedSupplierLoading: false,
                error: action.payload,
            };
        case "CLEAR_SELECTED_SUPPLIER":
            return {
                productByIdLoading: false,
                selectedSupplier: [],
            };
        default:
            return state;
    }
};
export const selectedCategoryReducer = (state = { selectedCategory: [] }, action) => {
    switch (action.type) {
        case "SET_SELECTED_CATEGORY_REQUEST":
            return {
                selectedCategoryLoading: true,
                ...state,
            };
        case "SET_SELECTED_CATEGORY_SUCCESS":
            return {
                selectedCategoryLoading: false,
                selectedCategory: action.payload,
            };
        case "SET_SELECTED_CATEGORY_ERROR":
            return {
                selectedCategoryLoading: false,
                error: action.payload,
            };
        case "CLEAR_SELECTED_CATEGORY":
            return {
                productByIdLoading: false,
                selectedCategory: [],
            };
        default:
            return state;
    }
};
