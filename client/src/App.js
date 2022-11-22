import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import "./index.scss";
import { Route, Routes } from "react-router-dom";

import ProductDetailPage from "./pages/site/pages/ProductDetailPage";
import CartPage from "./pages/site/pages/CartPage";
import FavoritePage from "./pages/site/pages/FavoritePage";
import {
    fetchCartLocalStorage,
    fetchCategories,
    fetchFavLocalStorage,
    fetchProducts,
    fetchSuppliers,
} from "./store/middleware/thunkActions";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./pages/site/pages/PageNotFound";
import AdminHome from "./pages/admin/home/AdminHome";
import Register from "./pages/site/pages/auth/Register";
import Login from "./pages/site/pages/auth/Login";
import ResetPassword from "./pages/site/pages/auth/ResetPassword";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./pages/site/pages/auth/AdminLogin";
import { AdminOnlyRoute } from "./tools/AdminOnly";
import ProtectedRoute from "./tools/ProtectedRoute";
import { userStorage } from "./service/localStorage/userStorage";
import { setCurrentUser } from "./store/actions/mainActions";
import NewPassword from "./pages/site/pages/auth/NewPassword";
import ProfilePage from "./pages/site/pages/profile-page/ProfilePage";
import Loading from "./assets/Loading";
import ContactPage from "./pages/site/pages/ContactPage";
import HomePage from "./pages/site/pages/homepage/HomePage";
import Footer from "./pages/components/Footer";
import Navbar from "./pages/components/Navbar";
import { getSingleRequest } from "./tools/Requests";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useSelector((state) => state.userReducer);
    const token = currentUser?.token ? currentUser?.token : null;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(fetchSuppliers());
        dispatch(fetchCartLocalStorage());
        dispatch(fetchFavLocalStorage());

        try {
            const user = userStorage.getUser();

            if (user.token) {
                getSingleRequest(user.isAdmin ? "admins" : "users", user._id)
                    .then((q) => {
                        console.log(q);
                        let newUser = {
                            name: q.data.name,
                            surname: q.data.surname,
                            email: q.data.email,
                            ...user,
                        };
                        console.log(newUser);
                        dispatch(setCurrentUser(newUser));
                    })
                    .catch((err) => console.log(err));
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="appJs ">
            {isLoading && <Loading />}
            {!isLoading && (
                <>
                    <ToastContainer
                        transition={Slide}
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    {/*  */}
                    <Navbar />
                    <Routes>
                        {/* AUTH ROUTES */}
                        <Route element={<ProtectedRoute token={!token} />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin-login" element={<AdminLogin />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/reset-password/:id/:token" element={<NewPassword />} />
                        </Route>

                        {/* USER ROUTES */}
                        <Route element={<ProtectedRoute token={token} />}>
                            <Route path="/profile-page/*" element={<ProfilePage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/favorites" element={<FavoritePage />} />
                            <Route path="/productdetail/:id" element={<ProductDetailPage />} />
                            {/* ADMIN ROUTE */}
                            <Route element={<AdminOnlyRoute />}>
                                <Route path="/admin/*" element={<AdminHome />} />
                            </Route>
                        </Route>

                        {/* PUBLIC ROUTE */}
                        <Route>
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/*" element={<PageNotFound />} />
                            <Route path="/" element={<HomePage />} />
                        </Route>
                    </Routes>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default App;
