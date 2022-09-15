export const favoriteStorage = {
    setFav: (favorites) => {
        let favs = JSON.stringify(favorites);
        localStorage.setItem("amazonCloneFavorites", favs);
    },

    getFav: () => {
        let favs = localStorage.getItem("amazonCloneFavorites");

        if (favs) {
            return JSON.parse(favs);
        } else {
            return [];
        }
    },
};
