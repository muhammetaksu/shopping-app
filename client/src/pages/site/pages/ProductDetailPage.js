import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProductById,
    setSelectedCategory,
    setSelectedSupplier,
} from "../../../store/middleware/thunkActions";
import { favoriteStorage } from "../../../service/localStorage/favoriteStorage";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
    addProductToCart,
    addToFavorites,
    clearGetProductById,
    clearSelectedCategory,
    clearSelectedSupplier,
    removeFromFavorites,
    setCartQuantity,
} from "../../../store/actions/mainActions";
import { cartStorage } from "../../../service/localStorage/cartStorage";

function ProductDetailPage() {
    const [productQuantity, setProductQuantity] = useState(1);

    const currentProductState = useSelector((state) => state.getProductByIdReducer);
    const { product, productByIdLoading } = currentProductState;

    const selectedCategoryState = useSelector((state) => state.selectedCategoryReducer);
    const { selectedCategory, selectedCategoryLoading } = selectedCategoryState;

    const selectedSupplierState = useSelector((state) => state.selectedSupplierReducer);
    const { selectedSupplier, selectedSupplierLoading } = selectedSupplierState;

    const favorites = useSelector((state) => state.favoritesReducer);
    const cart = useSelector((state) => state.cartReducer);

    console.log(product);

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductById(id));

        return () => {
            dispatch(clearGetProductById());
            dispatch(clearSelectedCategory());
            dispatch(clearSelectedSupplier());
        };
    }, [id]);

    useEffect(() => {
        console.log("second");
        // if (product) {
        dispatch(setSelectedCategory(product));
        dispatch(setSelectedSupplier(product));
        // } else {
        //     dispatch(fetchProductById(id));
        // }
    }, [id, product]);

    const addToCart = (item) => {
        const itemControl = cart.find((q) => q._id == item._id);

        if (!itemControl) {
            let newCartProduct = {
                _id: item._id,
                brand: item.brand,
                model: item.model,
                unitPrice: item.unitPrice,
                quantity: productQuantity,
                image: item.image,
            };

            dispatch(addProductToCart(newCartProduct));
            cartStorage.setCart([...cart, newCartProduct]);
        } else if (itemControl) {
            itemControl.quantity = Number(itemControl.quantity) + Number(productQuantity);
            dispatch(setCartQuantity([...cart]));
            cartStorage.setCart([...cart]);
        }
        setProductQuantity(1);
    };

    const addRemoveFavorites = (product) => {
        let checkFavorite = favorites.find((q) => q._id == product._id);

        if (checkFavorite) {
            dispatch(removeFromFavorites(product));
            let newFavs = favorites.filter((q) => q._id != product._id);
            favoriteStorage.setFav([...newFavs]);
        } else {
            dispatch(addToFavorites(product));
            let newFavs = [product, ...favorites];
            favoriteStorage.setFav([...newFavs]);
        }
    };

    const favControl = (product) => {
        let checkFavorite = favorites.find((q) => q._id == product._id);

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
        <div className="container">
            <div className="mt-4 mb-5 mx-5 d-flex placeholder-glow">
                <h2 className="m-0 py-2 px-4 bg-light border rounded">{product?.name}</h2>
            </div>
            <div className="row d-flex p-3">
                <div className="col-lg-4 d-flex text-center">
                    <img
                        src={`https://picsum.photos/id/${id + 10}/300/300`}
                        style={{ width: "100%" }}
                        alt="product"
                    />
                </div>
                <div className="col-lg-5">
                    <div className="mt-2 mb-3">
                        <h2 className="m-0">$ {Number(product?.unitPrice).toFixed(2)}</h2>
                    </div>

                    <div className="my-3">
                        <h4 className="m-0">{product?.name}</h4>
                    </div>

                    <div className="my-3">
                        <h5 className="m-0">
                            <span className="fs-6">Category:</span> {selectedCategory?.name}
                        </h5>
                    </div>

                    <div className="my-3">
                        <h5 className="m-0">
                            <span className="fs-6">Quantity Per Unit: </span>
                            {product.quantityPerUnit}
                        </h5>
                    </div>

                    {product.unitsInStock == 0 ? (
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
                                value={productQuantity}
                                defaultValue={productQuantity}
                                onChange={(e) => setProductQuantity(e.target.value)}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
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
                                <button className="btn bg-warning">Add To Cart</button>
                            )}
                        </div>
                        <div id="detailPageFavStarCont" className=" mx-3 d-flex my-auto">
                            <div>{favControl(product)}</div>
                        </div>
                    </div>
                </div>

                {/* SUPPLIER SECTION */}
                <div className="col-lg-3">
                    <div className="border-bottom my-2 ">
                        <div className="my-2 bg-light rounded fw-bold placeholder-glow">Seller</div>
                        <div className="my-1">
                            {selectedSupplier && selectedSupplier.companyName}
                        </div>
                    </div>

                    <div className="border-bottom my-2">
                        <div className="my-2 bg-light rounded fw-bold">Address</div>
                        <div className="my-1">
                            {selectedSupplier && selectedSupplier.address?.street}
                        </div>
                        <div className="my-1">
                            {selectedSupplier && selectedSupplier.address?.city}
                        </div>
                        <div className="my-1">
                            {selectedSupplier && selectedSupplier.address?.postalCode}
                        </div>
                        <div className="my-1">
                            {selectedSupplier && selectedSupplier.address?.country}
                        </div>
                    </div>
                    <div>
                        <div className="my-2 bg-light rounded fw-bold">Contact</div>

                        <div className="my-1">
                            {selectedSupplier && selectedSupplier.contactName}
                        </div>
                        <div className="my-1">
                            {selectedSupplier && selectedSupplier.contactTitle}
                        </div>
                        <div className="my-1">
                            {selectedSupplier && selectedSupplier.address?.phone}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
