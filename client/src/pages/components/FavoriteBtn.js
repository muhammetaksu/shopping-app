import React, { useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { modalsContext } from "../../context/ModalsProvider";
import { favoriteStorage } from "../../service/localStorage/favoriteStorage";
import { addToFavorites, removeFromFavorites } from "../../store/actions/mainActions";

const FavoriteBtn = ({ product }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favoritesReducer);
    const { currentUser } = useSelector((state) => state.userReducer);
    const { setIsModalOpen, setModalContent } = useContext(modalsContext);

    const addRemoveFavorites = (product) => {
        if (currentUser?.token) {
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
        } else {
            setIsModalOpen(true);
            setModalContent("You must be logged in to add products to favourites!");
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
