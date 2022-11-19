import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { favoriteStorage } from "../../service/localStorage/favoriteStorage";
import { addToFavorites, removeFromFavorites } from "../../store/actions/mainActions";

const FavoriteBtn = ({ product }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favoritesReducer);

    const addRemoveFavorites = (product) => {
        let checkFavorite = favorites?.find((q) => q._id === product._id);

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

    return (
        <>
            {favorites?.find((q) => q._id === product._id) ? (
                <AiFillStar
                    title="Remove From Favorites"
                    type="button"
                    id="favStar"
                    onClick={() => addRemoveFavorites(product)}
                    style={{ cursor: "pointer" }}
                />
            ) : (
                <AiOutlineStar
                    title="Add To Favorites"
                    type="button"
                    id="favStar"
                    onClick={() => addRemoveFavorites(product)}
                    style={{ cursor: "pointer" }}
                />
            )}
        </>
    );
};

export default FavoriteBtn;
