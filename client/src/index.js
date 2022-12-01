import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import PageNumberProvider from "./context/PageNumberProvider";
import ProductsPerPageProvider from "./context/ProductsPerPageProvider";
import ModalsProvider from "./context/ModalsProvider";
import LoadingProvider from "./context/LoadingProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <LoadingProvider>
                <PageNumberProvider>
                    <ProductsPerPageProvider>
                        <ModalsProvider>
                            <App />
                        </ModalsProvider>
                    </ProductsPerPageProvider>
                </PageNumberProvider>
            </LoadingProvider>
        </Provider>
    </BrowserRouter>
);
