import React, { createContext, useState } from "react";

export const productsPerPageContext = createContext(null);

function ProductsPerPageProvider({ children }) {
    const [productsPerPage, setProductsPerPage] = useState(10);

    const values = {
        productsPerPage,
        setProductsPerPage,
    };

    return (
        <div>
            <productsPerPageContext.Provider value={values}>
                {children}
            </productsPerPageContext.Provider>
        </div>
    );
}

export default ProductsPerPageProvider;
