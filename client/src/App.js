import React, { useContext, useEffect, useState, Suspense } from "react";
import "antd/dist/antd.min.css";
import "./index.scss";
import { Route, Router, Routes, useLocation } from "react-router-dom";
import {
    fetchCartLocalStorage,
    fetchCategories,
    fetchFavLocalStorage,
    fetchProducts,
    fetchSuppliers,
} from "./store/middleware/thunkActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminOnlyRoute } from "./tools/AdminOnly";
import ProtectedRoute from "./tools/ProtectedRoute";
import { getSingleRequest } from "./tools/Requests";
import { userStorage } from "./service/localStorage/userStorage";
import { setCurrentUser } from "./store/actions/mainActions";
import { modalsContext } from "./context/ModalsProvider";
import PageAnimation from "./assets/PageAnimation";
import { AnimatePresence } from "framer-motion";

/* COMPONENTS */
const PageNotFound = React.lazy(() => import("./pages/site/pages/PageNotFound"));
const AdminHome = React.lazy(() => import("./pages/admin/home/AdminHome"));
const Register = React.lazy(() => import("./pages/site/pages/auth/Register"));
const Login = React.lazy(() => import("./pages/site/pages/auth/Login"));
const ResetPassword = React.lazy(() => import("./pages/site/pages/auth/ResetPassword"));
const ProductDetailPage = React.lazy(() => import("./pages/site/pages/ProductDetailPage"));
const CartPage = React.lazy(() => import("./pages/site/pages/CartPage"));
const FavoritePage = React.lazy(() => import("./pages/site/pages/FavoritePage"));
const CheckoutSuccess = React.lazy(() => import("./pages/site/pages/CheckoutSuccess"));
const CheckoutPage = React.lazy(() => import("./pages/site/pages/CheckoutPage"));
const BasicModal = React.lazy(() => import("./pages/components/BasicModal"));
const Navbar = React.lazy(() => import("./pages/components/Navbar"));
const Footer = React.lazy(() => import("./pages/components/Footer"));
const HomePage = React.lazy(() => import("./pages/site/pages/homepage/HomePage"));
const ContactPage = React.lazy(() => import("./pages/site/pages/ContactPage"));
const ProfilePage = React.lazy(() => import("./pages/site/pages/profile-page/ProfilePage"));
const NewPassword = React.lazy(() => import("./pages/site/pages/auth/NewPassword"));
const AdminLogin = React.lazy(() => import("./pages/site/pages/auth/AdminLogin"));

function App() {
    const [pageAccess, setPageAccess] = useState(false);
    const { currentUser } = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();
    const location = useLocation();
    const { setModalContent, setIsModalOpen } = useContext(modalsContext);

    useEffect(() => {
        try {
            const user = userStorage.getUser();

            if (user.token) {
                getSingleRequest(user.isAdmin ? "admins" : "users", user._id, user.token)
                    .then((res) => {
                        let newUser = {
                            ...res.data,
                            ...user,
                        };
                        dispatch(setCurrentUser(newUser));
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.response.status === 401) {
                            setModalContent("Your session has expired. Please login again!");
                            setIsModalOpen(true);
                            userStorage.removeUser();
                        }
                    })
                    .finally(() => {
                        setPageAccess(true);
                    });
            } else {
                setPageAccess(true);
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(fetchCartLocalStorage());
        dispatch(fetchFavLocalStorage());
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(fetchSuppliers());
    }, []);

    return (
        <>
            {pageAccess && (
                <div className="appJs ">
                    <>
                        <BasicModal />
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

                        <Suspense>
                            <Routes location={location} key={location.key}>
                                <Route element={<PageAnimation pathname={location.pathname} />}>
                                    {/* AUTH ROUTES */}
                                    <Route element={<ProtectedRoute token={!currentUser?.token} />}>
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/admin-login" element={<AdminLogin />} />
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/reset-password" element={<ResetPassword />} />
                                        <Route
                                            path="/reset-password/:id/:token"
                                            element={<NewPassword />}
                                        />
                                    </Route>

                                    {/* USER ROUTES */}
                                    <Route element={<ProtectedRoute token={currentUser?.token} />}>
                                        <Route path="/profile-page/*" element={<ProfilePage />} />
                                        <Route path="/cart" element={<CartPage />} />
                                        <Route path="/favorites" element={<FavoritePage />} />
                                        <Route
                                            path="/productdetail/:id"
                                            element={<ProductDetailPage />}
                                        />
                                        <Route path="/checkout" element={<CheckoutPage />} />
                                        <Route
                                            path="/checkout-success"
                                            element={<CheckoutSuccess />}
                                        />
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
                                </Route>
                            </Routes>
                        </Suspense>
                        <Footer />
                    </>
                </div>
            )}
        </>
    );
}

export default App;
