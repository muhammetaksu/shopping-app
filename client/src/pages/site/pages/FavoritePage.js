import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { favoriteStorage } from "../../../service/localStorage/favoriteStorage";
import { useSelector, useDispatch } from "react-redux";
import { removeAllFavorites, removeFromFavorites } from "../../../store/actions/mainActions";

function FavoritePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector((state) => state.favoritesReducer);

    const deleteFromFavorites = (product) => {
        dispatch(removeFromFavorites(product));
        let newFavs = favorites.filter((q) => q._id != product._id);
        favoriteStorage.setFav([...newFavs]);
    };

    const deleteAllFavorites = () => {
        dispatch(removeAllFavorites());
        favoriteStorage.setFav([]);
    };

    return (
        <div className="container ">
            {favorites.length > 0 ? (
                <>
                    <div id="favPageHead" className="d-flex justify-content-between ps-5">
                        <div
                            style={{ width: "calc(10vw + 10rem)" }}
                            className="  me-2 my-4 p-2 border rounded bg-light d-flex justify-content-between"
                        >
                            <p
                                style={{
                                    fontSize: "calc(0.8vw + 0.8rem)",
                                    fontWeight: "600",
                                }}
                                className="m-0  "
                            >
                                Favorite List
                            </p>
                            <p
                                style={{
                                    fontSize: "calc(0.8vw + 0.8rem)",
                                    fontWeight: "600",
                                }}
                                className="m-0 "
                            >
                                <span>Total:</span> {favorites?.length}
                            </p>
                        </div>
                        <div id="rmvAllFav" className=" my-auto me-5 ms-2 my-4 ">
                            <button
                                onClick={() => deleteAllFavorites()}
                                id="rmvAllFavBtn"
                                className="btn my-auto"
                            >
                                Remove All Favorites
                            </button>
                        </div>
                    </div>
                    <div className="row p-0 m-0">
                        {favorites?.map((product) => (
                            <div key={product._id} className="mt-2 col-lg-6 px-5 py-2 ">
                                <div className="">
                                    <div className="row justify-content-between  border rounded">
                                        <div className="col-3 p-0">
                                            <img
                                                style={{
                                                    maxWidth: "100%",
                                                    cursor: "pointer",
                                                    padding: "5px",
                                                }}
                                                className=""
                                                src={product?.image.imageLink1}
                                                onClick={() =>
                                                    navigate(`/productdetail/${product?._id}`)
                                                }
                                                alt="detail"
                                            />
                                        </div>
                                        <div
                                            style={{
                                                wordWrap: "break-word",
                                                fontSize: "calc(0.6vw + 0.4rem)",
                                            }}
                                            className="favProductText col-2 text-center my-auto"
                                        >
                                            {product?.brand}
                                        </div>
                                        <div
                                            style={{
                                                wordWrap: "break-word",
                                                fontSize: "calc(0.6vw + 0.4rem)",
                                            }}
                                            className="favProductText col-2 text-center my-auto border-start"
                                        >
                                            {product?.model}
                                        </div>
                                        <div
                                            style={{
                                                wordWrap: "break-word",
                                                fontSize: "calc(0.5vw + 0.5rem)",
                                            }}
                                            className="favProductText col-3 text-center my-auto border-start "
                                        >
                                            Unit Price: <br /> ${" "}
                                            {Number(product?.unitPrice).toFixed(2)}
                                        </div>

                                        <div
                                            onClick={() => deleteFromFavorites(product)}
                                            style={{ cursor: "pointer" }}
                                            className="col-2 fs-4 text-center my-auto border-start py-3 px-3"
                                        >
                                            <svg
                                                style={{
                                                    width: "calc(0.6vw + 0.6rem)",
                                                }}
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
                </>
            ) : (
                <div className="d-flex justify-content-center mt-5 pt-5">
                    <div className="d-flex flex-column justify-content-center  m-auto">
                        <div className="d-flex justify-content-center">
                            <img
                                id="favPageStarImg"
                                src="https://cdn-icons-png.flaticon.com/512/616/616490.png"
                                alt="starImg"
                            />
                        </div>
                        <div id="emptyFavText" className="my-4">
                            <p
                                style={{ fontSize: "calc(1.2vw + 0.8rem)" }}
                                className="p-2 m-0 text-center"
                            >
                                There are no favorite products.
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
}

export default FavoritePage;
