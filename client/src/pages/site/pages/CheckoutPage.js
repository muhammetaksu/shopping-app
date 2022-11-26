import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
    const [totalCartItem, setTotalCartItem] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [shippingCost, setShippingCost] = useState(14);
    const [freeShippingPrice, setFreeShippingPrice] = useState(600);

    const cart = useSelector((state) => state.cartReducer);

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

    return (
        <div className="checkoutPageCont container">
            <div>
                <p>Checkout</p>
            </div>
            <div>
                <div>div 1</div>
                <div>
                    <h4>Summary</h4>
                    <div>
                        {cart &&
                            cart.map((product, i) => (
                                <p key={i}>
                                    <p>
                                        {product.brand} - {product.model}
                                    </p>
                                    <p>
                                        {product.quantity} * ${Number(product.unitPrice).toFixed(2)}
                                    </p>
                                </p>
                            ))}
                    </div>
                    {totalCartPrice > 500 && (
                        <div>
                            <span>Shipping Cost</span>
                            <span>${shippingCost.toFixed(2)}</span>
                        </div>
                    )}
                    <div>
                        <span>Total Price</span>
                        <span>${Number(totalCartPrice).toFixed(2)}</span>
                    </div>
                    <div>
                        <p>
                            Shipping is free if your cart total exceeds $
                            {freeShippingPrice.toFixed(2)}.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
