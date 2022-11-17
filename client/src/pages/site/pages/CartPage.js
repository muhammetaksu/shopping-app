import React, { useContext, useEffect, useState } from "react";
import { cartStorage } from "../../../service/localStorage/cartStorage";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeProductFromCart, setCartQuantity } from "../../../store/actions/mainActions";
import { optionForLoop } from "../../../assets/OptionForLoop";

const CartPage = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [totalCartItem, setTotalCartItem] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cartReducer);

    // Defining event listener function
    window.addEventListener("resize", function (event) {
        setWidth(window.innerWidth);
    });

    useEffect(() => {
        //////// SEPETTEKİ TOPLAM ÜRÜN MİKTARI
        let totalItemsInCart = 0;
        cart.forEach((i) => {
            totalItemsInCart = Number(totalItemsInCart) + Number(i.quantity);
        });
        setTotalCartItem(totalItemsInCart);
        /////// SEPETTEKİ ÜRÜNLERİN TOPLAM FİYATI
        let cartTotalPrice = 0;
        cart.forEach((i) => {
            cartTotalPrice = Number(i.quantity) * Number(i.unitPrice) + Number(cartTotalPrice);
        });
        setTotalCartPrice(cartTotalPrice);
    }, [cart]);

    const changeQuantity = (product, targetVal) => {
        product.quantity = targetVal;
        dispatch(setCartQuantity([...cart]));
        cartStorage.setCart([...cart]);
    };

    const removeFromCart = (product) => {
        dispatch(removeProductFromCart(product));
        let newCart = cart.filter((q) => q._id !== product._id);
        cartStorage.setCart(newCart);
    };

    return (
        <div id="cartPageContainer" className="container mb-3" style={{ minWidth: "375px" }}>
            {cart?.length !== 0 ? (
                <>
                    {width < 992 ? (
                        <div className=" d-flex  justify-content-evenly row mx-2">
                            <div
                                style={{ top: "0" }}
                                className="col-12 d-flex justify-content-center text-center  mt-5  border rounded position-sticky p-3  bg-light"
                            >
                                <div className="border-end my-auto cartSummaryBox">
                                    <h3 className="m-0 cartSummaryText">Cart Summary</h3>
                                </div>
                                <div className="border-end my-auto cartSummaryBox">
                                    <h3 className="m-0 cartSummaryText">
                                        Total Item: <br /> {totalCartItem}
                                    </h3>
                                </div>
                                <div className="border-end my-auto cartSummaryBox">
                                    <h3 className="m-0 cartSummaryText">
                                        Subtotal: <br /> $ {totalCartPrice}
                                    </h3>
                                </div>
                                <div className="my-auto  cartSummaryBox">
                                    <button id="cartBtn" className=" border-0 rounded p-2">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                            <div className="row col-12 p-0 m-0">
                                {cart &&
                                    cart.map((product, index) => (
                                        <div
                                            key={index}
                                            className="mt-5  border rounded"
                                            style={{ maxHeight: "110px" }}
                                        >
                                            <div className="row justify-content-start">
                                                <div className="col-2 p-0 me-2 d-flex justify-content-start">
                                                    <img
                                                        style={{
                                                            maxWidth: "100%",
                                                            cursor: "pointer",
                                                            padding: "5px",
                                                        }}
                                                        className=""
                                                        src={product?.image.imageLink1}
                                                        onClick={() =>
                                                            navigate(
                                                                `/productdetail/${product._id}`
                                                            )
                                                        }
                                                        alt="detail"
                                                    />
                                                </div>
                                                <div className="col-10  row p-0">
                                                    <div
                                                        id="cartProdName"
                                                        style={{
                                                            wordWrap: "break-word",
                                                        }}
                                                        className="col-2 text-center my-auto cartProductsText"
                                                    >
                                                        {product?.brand}
                                                    </div>
                                                    <div
                                                        id="cartProdName"
                                                        style={{
                                                            wordWrap: "break-word",
                                                        }}
                                                        className="col-2 text-center my-auto border-start cartProductsText"
                                                    >
                                                        {product?.model}
                                                    </div>
                                                    <div
                                                        style={{
                                                            wordWrap: "break-word",
                                                        }}
                                                        className="col-2 text-center my-auto border-start cartProductsText"
                                                    >
                                                        Price <br /> $ {product?.unitPrice}
                                                    </div>
                                                    <div
                                                        style={{
                                                            wordWrap: "break-word",
                                                        }}
                                                        className="col-2 text-center my-auto border-start cartProductsText"
                                                    >
                                                        <p
                                                            style={{
                                                                textOverflow: "ellipsis",
                                                            }}
                                                            className="m-0 text-nowrap overflow-hidden "
                                                        >
                                                            Quantity
                                                        </p>
                                                        <select
                                                            className="overflow-hidden "
                                                            value={product?.quantity}
                                                            onChange={(e) =>
                                                                changeQuantity(
                                                                    product,
                                                                    e.target.value
                                                                )
                                                            }
                                                        >
                                                            {optionForLoop(10)}
                                                        </select>
                                                    </div>
                                                    <div
                                                        style={{
                                                            wordWrap: "break-word",
                                                        }}
                                                        className="col-3  text-center my-auto border-start cartProductsText"
                                                    >
                                                        Total Price <br /> ${" "}
                                                        {product?.quantity * product?.unitPrice}
                                                    </div>
                                                    <div
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => removeFromCart(product)}
                                                        className="col-1 fs-4 text-center my-auto border-start py-3 px-2"
                                                    >
                                                        <svg
                                                            style={{ width: "1.9vw" }}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 448 512"
                                                        >
                                                            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        ///// IF WIDTH > 992px
                        <div className=" d-flex  justify-content-evenly row">
                            <div className="row col-8 m-0 p-0 ">
                                {cart &&
                                    cart.map((product, index) => (
                                        <div
                                            style={{ maxHeight: "110px" }}
                                            key={index}
                                            className="mt-5 ps-0 border rounded "
                                        >
                                            <div className="row justify-content-center">
                                                <div className="col-2 ps-0 d-flex">
                                                    <img
                                                        style={{
                                                            width: "110px",
                                                            height: "110px",
                                                            cursor: "pointer",
                                                            padding: "5px",
                                                        }}
                                                        className=""
                                                        src={product?.image.imageLink1}
                                                        onClick={() =>
                                                            navigate(
                                                                `/productdetail/${product._id}`
                                                            )
                                                        }
                                                        alt="detail"
                                                    />
                                                </div>
                                                <div className="col-10 row pe-0">
                                                    <div
                                                        style={{
                                                            wordWrap: "break-word",
                                                        }}
                                                        className="col-2 text-center my-auto cartProductsText"
                                                    >
                                                        {product.brand}
                                                    </div>
                                                    <div
                                                        style={{
                                                            wordWrap: "break-word",
                                                        }}
                                                        className="col-2 text-center my-auto border-start cartProductsText"
                                                    >
                                                        {product.model}
                                                    </div>
                                                    <div
                                                        style={{
                                                            wordWrap: "break-word",
                                                        }}
                                                        className="col-2 text-center my-auto border-start cartProductsText"
                                                    >
                                                        Price <br /> $ {product.unitPrice}
                                                    </div>
                                                    <div
                                                        style={{
                                                            wordWrap: "break-word",
                                                        }}
                                                        className="col-2 text-center my-auto border-start cartProductsText"
                                                    >
                                                        <p className="m-0">Quantity</p>
                                                        <select
                                                            value={product.quantity}
                                                            onChange={(e) =>
                                                                changeQuantity(
                                                                    product,
                                                                    e.target.value
                                                                )
                                                            }
                                                        >
                                                            {optionForLoop(10)}
                                                        </select>
                                                    </div>
                                                    <div
                                                        style={{
                                                            wordWrap: "break-word",
                                                        }}
                                                        className="col-3 text-center my-auto border-start cartProductsText"
                                                    >
                                                        Total Price <br /> ${" "}
                                                        {product?.quantity * product?.unitPrice}
                                                    </div>
                                                    <div
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => removeFromCart(product)}
                                                        className="col-1 fs-4 text-center my-auto border-start py-2"
                                                    >
                                                        <svg
                                                            style={{ width: "18px" }}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 448 512"
                                                        >
                                                            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div
                                style={{ maxHeight: "250px", top: "35px" }}
                                className="col-3 text-center  mt-5  border rounded position-sticky bg-light"
                            >
                                <div className="border-bottom">
                                    <h3 style={{ fontSize: "20px" }} className="my-3">
                                        Cart Summary
                                    </h3>
                                </div>
                                <div className="border-bottom">
                                    <h3 style={{ fontSize: "20px" }} className="my-3">
                                        Total Item: {totalCartItem}
                                    </h3>
                                </div>
                                <div className="border-bottom">
                                    <h3 style={{ fontSize: "20px" }} className="my-3">
                                        Subtotal: $ {totalCartPrice}
                                    </h3>
                                </div>
                                <div>
                                    <button id="cartBtn" className="my-3 border-0 rounded p-2 w-75">
                                        Proceed To Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="d-flex justify-content-center mt-5 pt-5">
                    <div className="d-flex flex-column justify-content-center  m-auto">
                        <div className="d-flex justify-content-center">
                            <img
                                id="favPageStarImg"
                                src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                            />
                        </div>
                        <div id="emptyFavText" className="my-4">
                            <p
                                style={{ fontSize: "calc(1.2vw + 0.8rem)" }}
                                className="p-2 m-0 text-center"
                            >
                                Your cart is empty.
                            </p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button id="favPageBtn" className="btn">
                                <NavLink className="text-black" to="/">
                                    Discover Products
                                </NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
