import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { optionForLoop } from "../../assets/OptionForLoop";
import TrashIcon from "../../assets/TrashIcon";
import { cartStorage } from "../../service/localStorage/cartStorage";
import { removeProductFromCart, setCartQuantity } from "../../store/actions/mainActions";

const CartPageProduct = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartReducer);

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
        <div className="cartPageProduct">
            <div>
                <img
                    src={product?.image.imageLink1}
                    onClick={() => navigate(`/productdetail/${product._id}`)}
                    alt="detail"
                />
            </div>
            <div>{product?.brand}</div>
            <div>{product?.model}</div>
            <div>
                Price <br /> $ {product?.unitPrice}
            </div>
            <div>
                <p>Quantity</p>
                <select
                    value={product?.quantity}
                    onChange={(e) => changeQuantity(product, e.target.value)}
                >
                    {optionForLoop(10)}
                </select>
            </div>
            <div>
                Total Price <br /> $ {product?.quantity * product?.unitPrice}
            </div>
            <div onClick={() => removeFromCart(product)}>
                <TrashIcon />
            </div>
        </div>
    );
};

export default CartPageProduct;
