import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../../store/middleware/thunkActions";
import { favoriteStorage } from "../../../service/localStorage/favoriteStorage";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
    addProductToCart,
    addToFavorites,
    clearGetProductById,
    removeFromFavorites,
    setCartQuantity,
} from "../../../store/actions/mainActions";
import { cartStorage } from "../../../service/localStorage/cartStorage";
import { optionForLoop } from "../../../assets/OptionForLoop";
import { toast } from "react-toastify";

function ProductDetailPage() {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const dispatch = useDispatch();

    const currentProductState = useSelector((state) => state.getProductByIdReducer);
    const { product } = currentProductState;

    const favorites = useSelector((state) => state.favoritesReducer);
    const cart = useSelector((state) => state.cartReducer);

    useEffect(() => {
        dispatch(fetchProductById(id));

        return () => {
            dispatch(clearGetProductById());
        };
    }, [id]);

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

    const addRemoveFavorites = (product) => {
        let checkFavorite = favorites.find((q) => q._id === product._id);

        if (checkFavorite) {
            dispatch(removeFromFavorites(product));
            let newFavs = favorites.filter((q) => q._id !== product._id);
            favoriteStorage.setFav([...newFavs]);
        } else {
            dispatch(addToFavorites(product));
            let newFavs = [product, ...favorites];
            favoriteStorage.setFav([...newFavs]);
        }
    };

    const favControl = (product) => {
        let checkFavorite = favorites.find((q) => q._id === product._id);

        if (checkFavorite) {
            return (
                <AiFillStar
                    title="Remove From Favorites"
                    type="button"
                    id="favStar"
                    onClick={() => addRemoveFavorites(product)}
                    style={{ cursor: "pointer" }}
                />
            );
        } else {
            return (
                <AiOutlineStar
                    title="Add To Favorites"
                    type="button"
                    id="favStar"
                    onClick={() => addRemoveFavorites(product)}
                    style={{ cursor: "pointer" }}
                />
            );
        }
    };

    return (
        <div className="container mb-3">
            <div className="my-4 text-center placeholder-glow">
                <h2 className="m-0 py-2 px-4 bg-light border rounded">
                    {product?.brand} {product?.model}
                </h2>
            </div>

            <div className="row d-flex p-3">
                <div className="col-lg-4 d-flex">
                    <img
                        src={product?.image?.imageLink1}
                        style={{ width: "100%", objectFit: "contain" }}
                        alt="product"
                    />
                </div>

                <div className="col-lg-5 d-flex">
                    <div className="my-auto w-100">
                        <div className="mt-2 mb-3">
                            <h2 className="m-0">$ {Number(product?.unitPrice).toFixed(2)}</h2>
                        </div>

                        <div className="my-3">
                            <h5 className="m-0">{product?.brand}</h5>
                        </div>
                        <div className="my-3">
                            <h5 className="m-0">{product?.model}</h5>
                        </div>

                        <div className="my-3">
                            <h5 className="m-0">
                                <span className="fs-6">Category:</span> {product?.category?.name}
                            </h5>
                        </div>

                        {product?.unitsInStock == 0 ? (
                            <div className="my-3">
                                <h5 className="m-0">
                                    <span className="fs-6 text-danger">
                                        There is no product in stock.
                                    </span>
                                </h5>
                            </div>
                        ) : (
                            <div className="d-flex">
                                <select
                                    className="form-select w-25"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                >
                                    {optionForLoop(20)}
                                </select>
                                <div className="my-auto fs-6 ms-3 text-success fw-bold">
                                    Units In Stock: {product.unitsInStock}
                                </div>
                            </div>
                        )}

                        <div className="my-3 d-flex">
                            <div>
                                {product.unitsInStock == 0 ? (
                                    <button
                                        disabled
                                        style={{ background: "lightgray" }}
                                        className="btn  text-white"
                                    >
                                        Add To Cart
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="btn bg-warning"
                                    >
                                        Add To Cart
                                    </button>
                                )}
                            </div>
                            <div id="detailPageFavStarCont" className=" mx-3 d-flex my-auto">
                                <div>{favControl(product)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SUPPLIER SECTION */}
                <div className="col-lg-3 d-flex">
                    <div className="my-auto w-100">
                        <div className="border-bottom my-2 ">
                            <div className="my-2 bg-light rounded fw-bold placeholder-glow">
                                Seller
                            </div>
                            <div className="my-1">{product?.supplier?.name}</div>
                        </div>

                        <div className="border-bottom my-2">
                            <div className="my-2 bg-light rounded fw-bold">Address</div>
                            <div className="my-1">{product?.supplier?.address?.address1}</div>
                            <div className="my-1">{product?.supplier?.address?.district}</div>
                            <div className="my-1">{product?.supplier?.address?.city}</div>
                            <div className="my-1">{product?.supplier?.address?.postalCode}</div>
                            <div className="my-1">{product?.supplier?.address?.region}</div>
                            <div className="my-1">{product?.supplier?.address?.country}</div>
                        </div>
                        <div>
                            <div className="my-2 bg-light rounded fw-bold">Contact</div>

                            <div className="my-1">{product?.supplier?.contactName}</div>
                            <div className="my-1">{product?.supplier?.contactTitle}</div>
                            <div className="my-1">{product?.supplier?.address?.phone}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-3">
                <div>
                    <h5>DESCRIPTION</h5>
                    <p className="fs-6">{product?.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
