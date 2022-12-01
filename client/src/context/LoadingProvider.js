import React, { createContext, useState } from "react";

export const loadingContext = createContext();

function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const values = {
        isLoading,
        setIsLoading,
        isPending,
        setIsPending,
    };

    return (
        <div>
            <loadingContext.Provider value={values}>{children}</loadingContext.Provider>
        </div>
    );
}

export default LoadingProvider;
