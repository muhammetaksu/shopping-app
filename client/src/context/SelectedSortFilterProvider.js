import React, { createContext, useState } from "react";

export const selectedSortFilterContext = createContext(null);

function SelectedSortFilterProvider({ children }) {
    const [selectedSortFilter, setSelectedSortFilter] = useState(-1);

    const values = { selectedSortFilter, setSelectedSortFilter };

    return (
        <div>
            <selectedSortFilterContext.Provider value={values}>
                {children}
            </selectedSortFilterContext.Provider>
        </div>
    );
}

export default SelectedSortFilterProvider;
