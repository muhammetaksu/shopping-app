import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequest, getSingleRequest } from "../../../tools/Requests";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { removeAllProduct } from "../../../store/actions/mainActions";
import { cartStorage } from "../../../service/localStorage/cartStorage";
import PrimaryButton from "../../components/PrimaryButton";
import { loadingContext } from "../../../context/LoadingProvider";
import Loading from "../../../assets/Loading";

const CheckoutSuccess = () => {
    const { currentUser } = useSelector((state) => state.userReducer);
    const [checkoutSession, setCheckoutSession] = useState({});
    const [productDetails, setProductDetails] = useState([]);
    const { isLoading, setIsLoading } = useContext(loadingContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let myOrder = {
            products: productDetails,
            userId: currentUser?._id,
            price: {
                totalPrice: checkoutSession?.amount_total,
                subtotal: checkoutSession?.amount_subtotal,
                shippingCost: checkoutSession?.shipping_cost?.amount_total,
            },
            stripeSessionId: checkoutSession?.id,
            deliveryAddress: checkoutSession?.metadata?.shipping_address,
        };
        console.log(myOrder);
    }, [checkoutSession, productDetails]);

    useLayoutEffect(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.search);
        let sessionId = urlParams.get("session_id");
        setProductDetails([]);
        setCheckoutSession({});

        if (sessionId) {
            let getOrderDetail = async () => {
                const res = await getRequest(
                    `stripe/order-info/${currentUser._id}?session_id=${sessionId}`,
                    currentUser.token
                );

                if (res?.status === 200 && res.data.newSession.payment_status === "paid") {
                    let productsId = res.data.newSession.metadata.productsId.split(" ");

                    const prod = res.data.listLineItems.data;

                    await productsId.map(async (item, index) => {
                        let currentQuantity = prod[index].quantity;
                        const result = await getSingleRequest("products", item, currentUser.token);

                        await setProductDetails((prevState) => [
                            ...prevState,
                            { ...result.data, quantity: currentQuantity },
                        ]);
                    });

                    /***********/

                    setCheckoutSession(res.data.newSession);

                    toast.success("Successful!");
                    dispatch(removeAllProduct());
                    cartStorage.setCart([]);
                }

                if (res?.status !== 200) {
                    toast.error("Order not found!");
                    navigate("/");
                }
                setIsLoading(false);
            };
            getOrderDetail();
        } else {
            toast.warning("Invalid URL!");
            navigate("/");
        }
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && (
                <div className="checkoutSuccessfulPage">
                    <div>
                        <h3>Your payment has been successful!</h3>
                    </div>
                    <div className="container">
                        <div>
                            <table className="checkoutSuccessfullTable">
                                <thead>
                                    <tr>
                                        <td></td>
                                        <td>Product</td>
                                        <td>Unit Price</td>
                                        <td>Quantity</td>
                                        <td>Total Price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productDetails?.map((product, i) => (
                                        <tr key={i}>
                                            <td>
                                                <img
                                                    src={product.image.imageLink1}
                                                    alt="product img"
                                                />
                                            </td>
                                            <td>
                                                {product.brand} - {product.model}
                                            </td>
                                            <td>${Number(product.unitPrice).toFixed(2)}</td>
                                            <td>{product.quantity}</td>
                                            <td>
                                                ${(product.unitPrice * product.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>Total</td>
                                        <td></td>
                                        <td>
                                            Shipping:{" "}
                                            {checkoutSession?.shipping_cost?.amount_total !== 0
                                                ? `$${(
                                                      checkoutSession?.shipping_cost?.amount_total /
                                                      100
                                                  ).toFixed(2)}`
                                                : "Free"}
                                        </td>
                                        <td></td>
                                        <td>${(checkoutSession?.amount_total / 100).toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div>
                            <div className="successfulPageOther">
                                <p>{checkoutSession?.metadata?.fullName}</p>
                                <p>{checkoutSession?.metadata?.shipping_address}</p>
                            </div>
                        </div>
                        <div className="successfulPageBtn">
                            <PrimaryButton text={"My Orders"} path={"/profile-page/orders"} />
                            <PrimaryButton text={"Go to Homepage"} path={"/"} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckoutSuccess;
