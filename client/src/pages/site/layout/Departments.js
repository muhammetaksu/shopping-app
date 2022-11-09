import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeProductsData } from "../../../store/actions/mainActions";

function Departments() {
    const dispatch = useDispatch();
    const suppliersState = useSelector((state) => state.suppliersReducer);
    const { suppliers } = suppliersState;

    const originalDataState = useSelector((state) => state.originalProductsReducer);
    const { originalProducts } = originalDataState;

    const getProductsBySupplier = (id) => {
        if (id == -1) {
            dispatch(changeProductsData(originalProducts));
        } else {
            const newProducts = originalProducts.filter((e) => e.supplierId == id);
            dispatch(changeProductsData(newProducts));
        }

        document.querySelector("#sortingFilterSelect").value = -1;
    };

    return (
        <div className="sideBar">
            <h3 id="sidebarTitle" className="border-bottom">
                <p className="m-0">Suppliers</p>
            </h3>
            <ul id="supplierItemsCont">
                <li
                    id="sidebarSupplierItem"
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => getProductsBySupplier(-1)}
                >
                    All Suppliers
                </li>
                {suppliers &&
                    suppliers.map((item, i) => {
                        return (
                            <li
                                id="sidebarSupplierItem"
                                onClick={() => getProductsBySupplier(item.id)}
                                key={i}
                                style={{ color: "black", cursor: "pointer" }}
                            >
                                {item.name}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default Departments;
