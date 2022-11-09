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
import ProtectedRoute from "./tools/ProtectedRoute";
import { userStorage } from "./service/localStorage/userStorage";
import { setCurrentUser } from "./store/actions/mainActions";
import NewPassword from "./pages/site/pages/auth/NewPassword";
import ProfilePage from "./pages/site/pages/profile-page/ProfilePage";

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
                {/* AUTH ROUTES */}
                <Route>
                    <Route
                        path="/login"
                        element={
                            <ProtectedRoute token={!token}>
                                <Login />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-login"
                        element={
                            <ProtectedRoute token={!token}>
                                <AdminLogin />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <ProtectedRoute token={!token}>
                                <Register />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <ProtectedRoute token={!token}>
                                <ResetPassword />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reset-password/:id/:token"
                        element={
                            <ProtectedRoute token={!token}>
                                <NewPassword />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* OTHER ROUTES */}
                <Route
                    path="/profile-page/*"
                    element={
                        <ProtectedRoute token={token}>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute token={token}>
                            <CartPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute token={token}>
                            <FavoritePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/productdetail/:id"
                    element={
                        <ProtectedRoute token={token}>
                            <ProductDetailPage />
                        </ProtectedRoute>
                    }
                />

                {/* ADMIN ROUTE */}

                <Route
                    path="/admin/*"
                    element={
                        <AdminOnlyRoute>
                            <ProtectedRoute token={token}>
                                <AdminHome />
                            </ProtectedRoute>
                        </AdminOnlyRoute>
                    }
                />

                <Route>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
