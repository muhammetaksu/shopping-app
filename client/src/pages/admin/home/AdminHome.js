import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
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
    return (
        <>
            <div className="adminPageNavbar row m-0 border-top border-secondary">
                {pages &&
                    pages.map((page, i) => (
                        <div className="col-lg-2 p-4 text-center">
                            <Link key={i} className="text-center" to={page.path}>
                                {page.title}
                            </Link>
                        </div>
                    ))}
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/admin/product-list" />} />
                    <Route path="/product-list" element={<ProductList />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/update-product/:id" element={<UpdateProduct />} />
                    <Route path="/category-list" element={<CategoryList />} />
                    <Route path="/add-category" element={<AddCategory />} />
                    <Route path="/update-category/:id" element={<UpdateCategory />} />
                    <Route path="/supplier-list" element={<SupplierList />} />
                    <Route path="/add-supplier" element={<AddSupplier />} />
                    <Route path="/update-supplier/:id" element={<UpdateSupplier />} />
                </Routes>
            </div>
        </>
    );
}

export default AdminHome;
