import React from "react";
import { NavLink } from "react-router-dom";
import { favoriteStorage } from "../../../service/localStorage/favoriteStorage";
import { useSelector, useDispatch } from "react-redux";
import { removeAllFavorites, removeFromFavorites } from "../../../store/actions/mainActions";
import FavPageProduct from "../../components/FavPageProduct";

function FavoritePage() {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favoritesReducer);

    const deleteAllFavorites = () => {
        dispatch(removeAllFavorites());
        favoriteStorage.setFav([]);
    };

    const deleteFromFavorites = (product) => {
        dispatch(removeFromFavorites(product));
        let newFavs = favorites.filter((q) => q._id !== product._id);
        favoriteStorage.setFav([...newFavs]);
    };

    return (
        <div className="container favPageContainer">
            {favorites.length > 0 ? (
                <>
                    <div id="favPageHead">
                        <div>
                            <p>Favorite List</p>
                            <p>
                                <span>Total:</span> {favorites?.length}
                            </p>
                        </div>
                        <div>
                            <button onClick={() => deleteAllFavorites()}>
                                Remove All Favorites
                            </button>
                        </div>
                    </div>
                    <div className="favPageProductCont">
                        {favorites?.map((product, index) => (
                            <FavPageProduct key={index} product={product} />
                        ))}
                    </div>
                </>
            ) : (
                <div className=" emptyBoxContainer">
                    <div>
                        <div>
                            <img
                                id="favPageStarImg"
                                src="https://cdn-icons-png.flaticon.com/512/616/616490.png"
                                alt="starImg"
                            />
                        </div>
                        <div id="emptyFavText">
                            <p>There are no favorite products.</p>
                        </div>
                        <div>
                            <button id="favPageBtn" className="btn">
                                <NavLink to="/">Discover Products</NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FavoritePage;
