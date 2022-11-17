import React, { useState } from "react";
import logo from "../images/icons/bx_bxl-amazon.png";
import locationIcon from "../images/icons/Location.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import searchIcon from "../images/icons/Search.png";
import drag from "../images/icons/Drag.png";
import close from "../images/icons/close.png";
import cartIcon from "../images/icons/shopping-cart.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeProductsData, clearCurrentUser } from "../../../store/actions/mainActions";
import { AdminOnlyLink } from "../../../tools/AdminOnly";
import { ShowOnLogin, ShowOnLogout } from "../../../tools/HiddenLink";
import { userStorage } from "../../../service/localStorage/userStorage";
import { toast } from "react-toastify";

function Navbar() {
    const [searchText, setSearchText] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cartReducer);
    const { suppliers } = useSelector((state) => state.suppliersReducer);

    const { originalProducts } = useSelector((state) => state.originalProductsReducer);

    const { currentUser } = useSelector((state) => state.userReducer);

    const getProductsBySupplier = (_id) => {
        if (_id === -1) {
            dispatch(changeProductsData(originalProducts));
        } else {
            const newProducts = originalProducts.filter((e) => e.supplier === _id);
            dispatch(changeProductsData(newProducts));
        }
        document.querySelector("#countProduct").value = -1;
    };

    const search = (text) => {
        setSearchText(text);
        const myText = text.toLowerCase();
        const filteredProducts = originalProducts.filter(
            (product) =>
                product.brand.toLowerCase().includes(myText) ||
                product.model.toLowerCase().includes(myText)
        );

        dispatch(changeProductsData(filteredProducts));
    };

    const activeLink = ({ isActive }) => (isActive ? "activeNavLink" : "");

    const handleLogout = async () => {
        await userStorage.removeUser();
        dispatch(clearCurrentUser());
        toast.success("Logout successfully!");
        navigate("/login");
    };

    return (
        <>
            <div className="siteNavbar">
                <div className="nav-bar">
                    {/* --------LOGO------- */}
                    <NavLink className="my-auto " to="/">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>
                    </NavLink>

                    {/* --------ADMIN PANEL------- */}
                    <AdminOnlyLink>
                        <ShowOnLogin>
                            <div className="navLinks">
                                <NavLink className={activeLink} to="/admin">
                                    Admin Panel
                                </NavLink>
                            </div>
                        </ShowOnLogin>
                    </AdminOnlyLink>

                    {/* --------LOCATION------- */}

                    {/* --------SEARCH------ */}
                    <div className="search_box">
                        <select
                            defaultValue={-1}
                            onChange={(e) => getProductsBySupplier(e.target.value)}
                            className="form-select search-departmants "
                            aria-label="Default select example"
                        >
                            <option value={-1}>All </option>
                            {suppliers &&
                                suppliers.map((item, i) => {
                                    return (
                                        <option value={item._id} key={i} style={{ color: "black" }}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                        <input
                            id="navbarInput"
                            value={searchText}
                            onChange={(e) => search(e.target.value)}
                            type=""
                            placeholder="Search"
                        />
                        <span
                            id="searchIconBox"
                            style={{ cursor: "pointer" }}
                            onClick={() => search(searchText)}
                        >
                            <img className="search_icon" src={searchIcon} alt="search" />
                        </span>
                    </div>

                    {/* --------ACCOUNT-LISTS----- */}

                    {/* --------ORDERS----- */}
                    <ShowOnLogin>
                        <div className="navLinks">
                            <NavLink className={activeLink} to="/favorites">
                                Favorites
                            </NavLink>
                        </div>
                    </ShowOnLogin>

                    {/* --------SHOPPING CART----- */}
                    <ShowOnLogin>
                        <div id="shopping-cart">
                            <NavLink
                                to="/cart"
                                style={{ maxHeight: "42px" }}
                                className={activeLink}
                            >
                                <div className="m-auto">Cart</div>
                                <div style={{ maxHeight: "42px" }}>
                                    <span className="cart-badge">{cart.length}</span>
                                    <br />
                                    <span className="cart-icon">
                                        <img src={cartIcon} alt="" />
                                    </span>
                                </div>
                            </NavLink>
                        </div>
                    </ShowOnLogin>

                    {currentUser?.name ? (
                        <ShowOnLogin>
                            <NavLink className="navLinks" to={"/profile-page"}>
                                <p>Welcome</p>

                                <div className="navLinks">
                                    <p>{currentUser?.name}</p>
                                </div>
                            </NavLink>
                        </ShowOnLogin>
                    ) : (
                        <div>
                            <p>Welcome</p>

                            <div className="accounts-list-dropdown">
                                <p>Guest</p>
                            </div>
                        </div>
                    )}

                    <ShowOnLogin>
                        <div className="navLinks">
                            <Link
                                onClick={() => handleLogout()}
                                style={{ maxHeight: "42px", cursor: "pointer" }}
                            >
                                Logout
                            </Link>
                        </div>
                    </ShowOnLogin>

                    {/* ------------------AUTH---------------- */}
                    <ShowOnLogout>
                        <div className="navLinks">
                            <NavLink className={activeLink} to="/register">
                                Register
                            </NavLink>
                        </div>
                    </ShowOnLogout>
                    <ShowOnLogout>
                        <div className="navLinks">
                            <NavLink
                                className={activeLink}
                                // className={activeLink}
                                to="/login"
                            >
                                User Login
                            </NavLink>
                        </div>
                    </ShowOnLogout>
                    <ShowOnLogout>
                        <div className="navLinks">
                            <NavLink className={activeLink} to="/admin-login">
                                Admin Login
                            </NavLink>
                        </div>
                    </ShowOnLogout>

                    {/* --------HAMBURBER MENU----- */}
                    <label htmlFor="check" className="bar">
                        <span id="bars">
                            <img src={drag} alt="bar" />
                        </span>
                        <span id="times">
                            <img src={close} alt="times" />
                        </span>
                    </label>
                </div>
            </div>
        </>
    );
}

export default Navbar;
