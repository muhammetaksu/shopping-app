import React, { useContext, useEffect, useState } from "react";
import { baseManager } from "../../../network/baseManager";
import logo from "../images/icons/bx_bxl-amazon.png";
import locationIcon from "../images/icons/Location.png";
import { Link, NavLink } from "react-router-dom";
import searchIcon from "../images/icons/Search.png";
import dropdownBotomLight from "../images/icons/dropdown-bottom.png";
import drag from "../images/icons/Drag.png";
import close from "../images/icons/close.png";
import cartIcon from "../images/icons/shopping-cart.png";
import "../styles/Header.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeData, changeProductsData } from "../../../store/actions/mainActions";

function Navbar() {
    const [searchText, setSearchText] = useState("");

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cartReducer);
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
        document.querySelector("#countProduct").value = -1;
    };

    const search = (text) => {
        setSearchText(text);
        const myText = text.toLowerCase();
        const filteredProducts = originalProducts.filter((product) =>
            product.name.toLowerCase().includes(myText)
        );
        dispatch(changeProductsData(filteredProducts));
    };

    return (
        <>
            <div className="header">
                <input type="checkbox" id="check" />
                <div className="nav-bar">
                    {/* --------LOGO------- */}
                    <NavLink className="my-auto" to="/">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>
                    </NavLink>

                    {/* --------ADMIN PANEL------- */}
                    <div className="adminPanelCont">
                        <Link className="adminPanel" to={"/admin"}>
                            Admin Panel
                        </Link>
                    </div>

                    {/* --------LOCATION------- */}
                    <div className="location">
                        <div className="location-icon">
                            <img src={locationIcon} alt="location" />
                        </div>
                        <div className="location-title">
                            <p>Delivers</p>
                            <p>Ottowa, K2G 1V8</p>
                        </div>
                    </div>
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
                                suppliers.map((item) => {
                                    return (
                                        <option
                                            value={item.id}
                                            key={item.id}
                                            style={{ color: "black" }}
                                        >
                                            {item.companyName}
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

                    <div className="accounts-lists">
                        <p>Hello Guest</p>

                        <div className="accounts-list-dropdown">
                            <p>Accounts & Lists</p>
                            <p>
                                <img src={dropdownBotomLight} alt="" />
                            </p>
                        </div>
                    </div>
                    {/* --------ORDERS----- */}
                    <div className="favorites">
                        <NavLink to="/favorites">Favorites</NavLink>
                    </div>
                    {/* --------SHOPPING CART----- */}
                    <NavLink style={{ maxHeight: "42px" }} className="shopping-cart" to="/cart">
                        <div style={{ maxHeight: "42px" }}>
                            <span className="cart-badge">{cart.length}</span>
                            <br />
                            <span className="cart-icon">
                                <img src={cartIcon} alt="" />
                            </span>
                        </div>
                    </NavLink>
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
