import React, { useEffect } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/site/layout/Navbar";
import HomePage from "./pages/site/pages/HomePage";
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
import { AdminOnlyLink, AdminOnlyRoute } from "./tools/AdminOnly";
import GuardRoute from "./tools/GuardRoute";
import ProfilePage from "./pages/site/pages/ProfilePage";
import { userStorage } from "./service/localStorage/userStorage";
import { setCurrentUser } from "./store/actions/mainActions";
import NewPassword from "./pages/site/pages/auth/NewPassword";

function App() {
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
            console.log(user);

            if (user) {
                dispatch(setCurrentUser(user));
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="appJs ">
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
                <Route>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Route>

                {/* AUTH ROUTES */}
                <Route>
                    <Route
                        path="/login"
                        element={
                            <GuardRoute token={!token}>
                                <Login />
                            </GuardRoute>
                        }
                    />
                    <Route
                        path="/admin-login"
                        element={
                            <GuardRoute token={!token}>
                                <AdminLogin />
                            </GuardRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <GuardRoute token={!token}>
                                <Register />
                            </GuardRoute>
                        }
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <GuardRoute token={!token}>
                                <ResetPassword />
                            </GuardRoute>
                        }
                    />
                    <Route
                        path="/reset-password/:id/:token"
                        element={
                            <GuardRoute token={!token}>
                                <NewPassword />
                            </GuardRoute>
                        }
                    />
                </Route>

                {/* OTHER ROUTES */}
                <Route
                    path="/profile-page"
                    element={
                        <GuardRoute token={token}>
                            <ProfilePage />
                        </GuardRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <GuardRoute token={token}>
                            <CartPage />
                        </GuardRoute>
                    }
                />
                <Route
                    path="/favorites"
                    element={
                        <GuardRoute token={token}>
                            <FavoritePage />
                        </GuardRoute>
                    }
                />
                <Route
                    path="/productdetail/:id"
                    element={
                        <GuardRoute token={token}>
                            <ProductDetailPage />
                        </GuardRoute>
                    }
                />

                {/* ADMIN ROUTE */}
                <Route>
                    <Route
                        path="/admin/*"
                        element={
                            <GuardRoute token={token}>
                                <AdminOnlyRoute>
                                    <AdminHome />
                                </AdminOnlyRoute>
                            </GuardRoute>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
