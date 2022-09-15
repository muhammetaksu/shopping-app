export const cartStorage = {
    setCart: (cart) => {
        let value = JSON.stringify(cart);
        localStorage.setItem("amazonCloneCart", value);
    },

    getCart: () => {
        let cart = localStorage.getItem("amazonCloneCart");

        if (cart) {
            return JSON.parse(cart);
        } else {
            return [];
        }
    },
};
