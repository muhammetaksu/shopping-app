import React, { createContext, useState } from "react";

export const pageNumberContext = createContext(null);

function PageNumberProvider({ children }) {
    const [page, setPage] = useState(0);

    const values = {
        page,
        setPage,
    };

    return (
        <div>
            <pageNumberContext.Provider value={values}>{children}</pageNumberContext.Provider>
        </div>
    );
}

export default PageNumberProvider;
