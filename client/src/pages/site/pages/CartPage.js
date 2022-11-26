import React, { useEffect, useState } from "react";
import { cartStorage } from "../../../service/localStorage/cartStorage";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeAllProduct } from "../../../store/actions/mainActions";
import CartPageProduct from "../../components/CartPageProduct";
import { getSingleRequestByUserId, postRequest } from "../../../tools/Requests";

const CartPage = () => {
    const [totalCartItem, setTotalCartItem] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [address, setAddress] = useState([]);

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cartReducer);
    const { currentUser } = useSelector((state) => state.userReducer);

    useEffect(() => {
        const getAddress = async () => {
            const response = await getSingleRequestByUserId(
                "address",
                currentUser._id,
                currentUser.token
            );
            setAddress(response.data);
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

    const handleCheckout = async () => {
        const checkoutOptions = {
            cart,
            userId: currentUser._id,
        };
        const response = await postRequest(
            "stripe/create-checkout-session",
            checkoutOptions,
            currentUser.token
        );

        if (response) {
            console.log(response);
            // window.location.href = response.data.url;
        }
    };

    return (
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
                                <h3>Cart Summary</h3>
                            </div>
                            <div>
                                <h3>Total Item: {totalCartItem}</h3>
                            </div>
                            <div>
                                <h3>Subtotal: $ {totalCartPrice}</h3>
                            </div>
                            <div>
                                <button onClick={() => handleCheckout()} id="cartBtn">
                                    Proceed To Checkout
                                </button>
                            </div>
                        </div>
                        {/* <div>
                                <div>Address</div>
                            </div> */}
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
    );
};

export default CartPage;
