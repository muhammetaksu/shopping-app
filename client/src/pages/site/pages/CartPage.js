import React, { useContext, useEffect, useState } from "react";
import { cartStorage } from "../../../service/localStorage/cartStorage";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeAllProduct } from "../../../store/actions/mainActions";
import CartPageProduct from "../../components/CartPageProduct";
import { getSingleRequestByUserId, postRequest } from "../../../tools/Requests";
import { Select } from "antd";
import { toast } from "react-toastify";
import PrimaryButton from "../../components/PrimaryButton";
import { loadingContext } from "../../../context/LoadingProvider";

const CartPage = () => {
    const [totalCartItem, setTotalCartItem] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [shippingOptions, setShippingOptions] = useState({
        shippingCost: 15,
        freeShippingLimit: 999,
    });
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const { isLoading, setIsLoading } = useContext(loadingContext);

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cartReducer);
    const { currentUser } = useSelector((state) => state.userReducer);

    useEffect(() => {
        setIsLoading(true);
        const getAddress = async () => {
            const response = await getSingleRequestByUserId(
                "address",
                currentUser._id,
                currentUser.token
            );
            setAddress(response.data);
            setIsLoading(false);
        };
        getAddress();
    }, []);

    useEffect(() => {
        //////// TOTAL PRODUCT COUNT
        let totalItemsInCart = 0;
        cart.forEach((i) => {
            totalItemsInCart = Number(totalItemsInCart) + Number(i.quantity);
        });
        setTotalCartItem(totalItemsInCart);
        /////// PRODUCTS TOTAL PRICE
        let cartTotalPrice = 0;
        cart.forEach((i) => {
            cartTotalPrice = Number(i.quantity) * Number(i.unitPrice) + Number(cartTotalPrice);
        });
        setTotalCartPrice(cartTotalPrice);
    }, [cart]);

    const deleteAllProducts = () => {
        dispatch(removeAllProduct());
        cartStorage.setCart([]);
    };

    const handleChangeAddress = (id) => {
        let selected = address.find((q) => q._id === id);
        let fullAddress = `${selected?.address} / ${selected?.district} - ${selected?.city} - ${
            selected?.state ? selected?.state + "-" : ""
        } ${selected?.country} / ${selected?.postalCode}`;

        if (!selected) {
            setSelectedAddress("");
        } else {
            setSelectedAddress(fullAddress);
        }
    };

    const handleCheckout = async () => {
        let productsId = "";
        await cart.map((item, index) => {
            if (index + 1 === cart.length) {
                productsId += `${item._id}`;
            } else {
                productsId += `${item._id} `;
            }
        });

        const checkoutOptions = {
            cart,
            userId: currentUser._id,
            email: currentUser.email,
            fullName: currentUser.name + " " + currentUser.surname,
            deliveryAddress: selectedAddress,
            productsId: productsId,
            cartTotalPrice: totalCartPrice,
            shippingOptions: shippingOptions,
        };

        if (!selectedAddress) return toast.warning("You must choose an address!");

        const response = await postRequest(
            "stripe/create-checkout-session",
            checkoutOptions,
            currentUser.token
        );

        if (response.status === 200) {
            window.location.href = response.data.url;
        }
    };

    return (
        <>
            <div id="cartPageContainer" className="container">
                {cart?.length !== 0 ? (
                    <>
                        <div className="cartPageHeader">
                            <div>
                                <p>Cart</p>
                            </div>
                            <button onClick={() => deleteAllProducts()}>Remove All Products</button>
                        </div>
                        <div className="cartPageContent ">
                            <div>
                                {cart &&
                                    cart.map((product, index) => (
                                        <CartPageProduct product={product} key={index} />
                                    ))}
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <h3>Cart Summary</h3>
                                    </div>
                                    <div>
                                        <h3>Total Item: {totalCartItem}</h3>
                                    </div>
                                    <div>
                                        <h3>
                                            Shipping:{" "}
                                            {totalCartPrice > shippingOptions.freeShippingLimit
                                                ? "Free"
                                                : `$${shippingOptions.shippingCost.toFixed(2)}`}
                                        </h3>
                                    </div>
                                    <div>
                                        <h3>Subtotal: ${totalCartPrice.toFixed(2)}</h3>
                                    </div>
                                    <div>
                                        <h3>
                                            Total: $
                                            {(
                                                totalCartPrice +
                                                (totalCartPrice > shippingOptions.freeShippingLimit
                                                    ? 0
                                                    : shippingOptions.shippingCost)
                                            ).toFixed(2)}
                                        </h3>
                                    </div>
                                    <div>
                                        <button onClick={() => handleCheckout()} id="cartBtn">
                                            Proceed To Checkout
                                        </button>
                                    </div>
                                </div>
                                <div className="cartShippingAlert">
                                    <p>
                                        Add ${shippingOptions.freeShippingLimit.toFixed(2)} more to
                                        get free shipping!
                                    </p>
                                </div>
                                <div className="cartSelectAddressCont">
                                    <div>
                                        <p>Select Delivery Address</p>
                                    </div>

                                    {address.length > 0 ? (
                                        <div className="cartPageSelect">
                                            <Select
                                                allowClear
                                                size="large"
                                                showSearch
                                                onChange={(id) => handleChangeAddress(id)}
                                                placeholder="Select an address"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? "")
                                                        .toLowerCase()
                                                        .includes(input.toLowerCase())
                                                }
                                                options={address.map((item) => ({
                                                    label:
                                                        item.title +
                                                        " / " +
                                                        item.city +
                                                        " / " +
                                                        (item.state ? item.state + " / " : "") +
                                                        item.country,
                                                    value: item._id,
                                                }))}
                                            />
                                            <PrimaryButton
                                                text="Add New Address"
                                                path={"/profile-page/addresses/add"}
                                            />
                                        </div>
                                    ) : (
                                        <div className="cartPageAddAddress">
                                            <p>
                                                You do not have a delivery address. You must add an
                                                address!
                                            </p>
                                            <PrimaryButton
                                                text="Add Address"
                                                path={"/profile-page/addresses/add"}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="emptyBoxContainer">
                        <div>
                            <div>
                                <img
                                    id="favPageStarImg"
                                    src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                                    alt="empty cart"
                                />
                            </div>
                            <div id="emptyFavText">
                                <p>Your cart is empty.</p>
                            </div>
                            <div>
                                <button id="favPageBtn" className="btn">
                                    <NavLink to="/">Discover Products</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;
