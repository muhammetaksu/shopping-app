import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { modalsContext } from "../../context/ModalsProvider";
import { cartStorage } from "../../service/localStorage/cartStorage";
import { addProductToCart, setCartQuantity } from "../../store/actions/mainActions";

const AddToCartBtn = ({ product, quantity, setQuantity }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartReducer);
    const { currentUser } = useSelector((state) => state.userReducer);
    const { setIsModalOpen, setModalContent } = useContext(modalsContext);

    const addToCart = (item) => {
        if (currentUser?.token) {
            const itemControl = cart.find((q) => q._id === item._id);

            if (!itemControl) {
                dispatch(addProductToCart({ ...item, quantity }));
                cartStorage.setCart([...cart, { ...item, quantity }]);
            } else if (itemControl) {
                if (itemControl.quantity >= 10 || itemControl.quantity + quantity > 10) {
                    toast.warning("You can add up to 10!");
                } else {
                    itemControl.quantity = itemControl.quantity + quantity;
                    dispatch(setCartQuantity([...cart]));
                    cartStorage.setCart([...cart]);
                }
            }
            setQuantity(1);
        } else {
            setIsModalOpen(true);
            setModalContent("You must be logged in to add products to the cart!");
        }
    };
    return (
        <>
            {product.unitsInStock !== 0 ? (
                <div>
                    <button onClick={() => addToCart(product)} className="cardButton">
                        Add To Cart
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        disabled
                        style={{ background: "lightgray" }}
                        className="cardButton text-white"
                    >
                        Add To Cart
                    </button>
                </div>
            )}
        </>
    );
};

export default AddToCartBtn;
