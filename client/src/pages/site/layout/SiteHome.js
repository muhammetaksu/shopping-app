import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { cartStorage } from "../../../service/localStorage/cartStorage";
import {
    addProductToCart,
    addToFavorites,
    removeFromFavorites,
    setCartQuantity,
} from "../../../store/actions/mainActions";
import { favoriteStorage } from "../../../service/localStorage/favoriteStorage";
import { TablePagination } from "@mui/material";
import { pageNumberContext } from "../../../context/PageNumberProvider";
import { productsPerPageContext } from "../../../context/ProductsPerPageProvider";

function SiteHome() {
    const [productQuantity, setProductQuantity] = useState(1);

    const { page, setPage } = useContext(pageNumberContext);
    const { productsPerPage, setProductsPerPage } = useContext(productsPerPageContext);

    const navigate = useNavigate();
    const productsState = useSelector((state) => state.productsReducer);
    const { products, error } = productsState;
    const originalDataState = useSelector((state) => state.originalProductsReducer);
    const { originalProducts } = originalDataState;
    const cart = useSelector((state) => state.cartReducer);
    const favorites = useSelector((state) => state.favoritesReducer);

    const dispatch = useDispatch();

    const addToCart = (item) => {
        const itemControl = cart.find((q) => q.id == item.id);

        if (!itemControl) {
            let newCartProduct = {
                id: item.id,
                name: item.name,
                unitPrice: item.unitPrice,
                quantity: productQuantity,
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
        let checkFavorite = favorites.find((q) => q.id == product.id);

        if (checkFavorite) {
            dispatch(removeFromFavorites(product));
            let newFavs = favorites.filter((q) => q.id != product.id);
            favoriteStorage.setFav([...newFavs]);
        } else {
            dispatch(addToFavorites(product));
            let newFavs = [product, ...favorites];
            favoriteStorage.setFav([...newFavs]);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 140 });
    };

    const handleChangeProductsPerPage = (event) => {
        setProductsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const favControl = (product) => {
        let checkFavorite = favorites.find((q) => q.id == product.id);

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
        <div className="row w-100">
            {products &&
                products
                    .slice(page * productsPerPage, page * productsPerPage + productsPerPage)
                    .map((product, index) => (
                        <div key={index} className="col-lg-6">
                            <div className="card">
                                <div className="cardImgCont">
                                    <img
                                        onClick={() => navigate(`/productdetail/${product.id}`)}
                                        className="cardImg"
                                        src={product.image.img1}
                                        alt="detail"
                                    />
                                </div>
                                <div className="cardCol ">
                                    <div className="cardPrice ">
                                        $ {Number(product.unitPrice).toFixed(2)}
                                    </div>
                                    <div className="cardProduct ">{product.brand}</div>
                                    <div className="cardProduct ">{product.model}</div>
                                    <div className="cardProduct">
                                        Category ID: {product.categoryId} / Supplier ID:{" "}
                                        {product.supplierId}
                                    </div>
                                    {product.unitsInStock != 0 ? (
                                        <div className="cardProduct">
                                            <select
                                                value={productQuantity}
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
                                            <div className="my-auto ms-3">
                                                Units In Stock: {product.unitsInStock}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="cardProduct text-danger">
                                            There is no product in stock.
                                        </div>
                                    )}

                                    <div className=" cardProduct">
                                        {product.unitsInStock != 0 ? (
                                            <div>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="cardButton"
                                                >
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
                    ))}

            <div
                id="paginationBox"
                style={{ background: "lightgray" }}
                className="d-flex justify-content-center"
            >
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products?.length}
                    rowsPerPage={productsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeProductsPerPage}
                />
            </div>
        </div>
    );
}

export default SiteHome;
