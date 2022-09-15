import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import PageNumberProvider from "./context/PageNumberProvider";
import ProductsPerPageProvider from "./context/ProductsPerPageProvider";
import SelectedSortFilterProvider from "./context/SelectedSortFilterProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PageNumberProvider>
                <ProductsPerPageProvider>
                    <SelectedSortFilterProvider>
                        <App />
                    </SelectedSortFilterProvider>
                </ProductsPerPageProvider>
            </PageNumberProvider>
        </Provider>
    </BrowserRouter>
);
