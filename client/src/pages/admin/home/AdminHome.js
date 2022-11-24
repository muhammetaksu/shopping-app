import React from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import AddCategory from "../categories/AddCategory";
import CategoryList from "../categories/CategoryList";
import UpdateCategory from "../categories/UpdateCategory";
import AddProduct from "../products/AddProduct";
import ProductList from "../products/ProductList";
import UpdateProduct from "../products/UpdateProduct";
import AddSupplier from "../suppliers/AddSupplier";
import SupplierList from "../suppliers/SupplierList";
import UpdateSupplier from "../suppliers/UpdateSupplier";

const pages = [
    {
        title: "Product List",
        path: "product-list",
    },
    {
        title: "Add Product",
        path: "add-product",
    },
    {
        title: "Category List",
        path: "category-list",
    },
    {
        title: "Add Category",
        path: "add-category",
    },
    {
        title: "Supplier List",
        path: "supplier-list",
    },
    {
        title: "Add Supplier",
        path: "add-supplier",
    },
];

function AdminHome() {
    const { currentUser } = useSelector((state) => state.userReducer);

    const activeLink = ({ isActive }) => (isActive ? "adminActiveNavLink" : "");
    return (
        <>
            <div className="adminPageNavbar m-0 ">
                {pages &&
                    pages.map((page, i) => (
                        <NavLink key={i} className={activeLink} to={page.path}>
                            {page.title}
                        </NavLink>
                    ))}
            </div>
            <div>
                <Routes>
                    <Route path="" element={<Navigate to="/admin/product-list" />} />
                    <Route
                        path="product-list"
                        element={<ProductList currentUser={currentUser} />}
                    />
                    <Route path="add-product" element={<AddProduct currentUser={currentUser} />} />
                    <Route
                        path="update-product/:id"
                        element={<UpdateProduct currentUser={currentUser} />}
                    />
                    <Route
                        path="category-list"
                        element={<CategoryList currentUser={currentUser} />}
                    />
                    <Route
                        path="add-category"
                        element={<AddCategory currentUser={currentUser} />}
                    />
                    <Route
                        path="update-category/:id"
                        element={<UpdateCategory currentUser={currentUser} />}
                    />
                    <Route
                        path="supplier-list"
                        element={<SupplierList currentUser={currentUser} />}
                    />
                    <Route
                        path="add-supplier"
                        element={<AddSupplier currentUser={currentUser} />}
                    />
                    <Route
                        path="update-supplier/:id"
                        element={<UpdateSupplier currentUser={currentUser} />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default AdminHome;
