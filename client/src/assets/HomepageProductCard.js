import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cartStorage } from "../service/localStorage/cartStorage";
import { favoriteStorage } from "../service/localStorage/favoriteStorage";
import {
    addProductToCart,
    addToFavorites,
    removeFromFavorites,
    setCartQuantity,
} from "../store/actions/mainActions";
import { optionForLoop } from "./OptionForLoop";

const HomepageProductCard = ({ product, index }) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartReducer);
    const favorites = useSelector((state) => state.favoritesReducer);

    const favControl = (item) => {
        let checkFavorite = favorites.find((q) => q._id === item._id);

        if (checkFavorite) {
            return (
                <AiFillStar
                    title="Remove From Favorites"
                    type="button"
                    id="favStar"
                    onClick={() => addRemoveFavorites(item)}
                    style={{ cursor: "pointer" }}
                />
            );
        } else {
            return (
                <AiOutlineStar
                    title="Add To Favorites"
                    type="button"
                    id="favStar"
                    onClick={() => addRemoveFavorites(item)}
                    style={{ cursor: "pointer" }}
                />
            );
        }
    };

    const addToCart = (item) => {
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
    };

    const addRemoveFavorites = (item) => {
        let checkFavorite = favorites.length > 0 && favorites.find((q) => q._id === item._id);

        if (checkFavorite) {
            dispatch(removeFromFavorites(item));
            let newFavs = favorites.filter((q) => q._id !== item._id);
            favoriteStorage.setFav([...newFavs]);
        } else {
            dispatch(addToFavorites(item));
            let newFavs = [item, ...favorites];
            favoriteStorage.setFav([...newFavs]);
        }
    };
    return (
        <div key={index} className="col-lg-6">
            <div className="card">
                <div className="cardImgCont">
                    <img
                        onClick={() => navigate(`/productdetail/${product._id}`)}
                        className="cardImg"
                        src={product.image.imageLink1}
                        alt="detail"
                    />
                </div>
                <div className="cardCol ">
                    <div className="cardPrice ">$ {Number(product.unitPrice).toFixed(2)}</div>
                    <div className="cardProduct ">{product.brand}</div>
                    <div className="cardProduct ">{product.model}</div>
                    <div className="cardProduct">Category: {product.category.name}</div>
                    {product.unitsInStock != 0 ? (
                        <div className="cardProduct">
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            >
                                {optionForLoop(10)}
                            </select>
                            <div className="my-auto ms-3">
                                Units In Stock: {product.unitsInStock}
                            </div>
                        </div>
                    ) : (
                        <div className="cardProduct text-danger">There is no product in stock.</div>
                    )}

                    <div className=" cardProduct">
                        {product.unitsInStock != 0 ? (
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
                        <div id="favStarCont" className=" mx-3 d-flex my-auto">
                            <div>{favControl(product)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomepageProductCard;
