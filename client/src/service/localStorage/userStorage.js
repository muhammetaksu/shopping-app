export const userStorage = {
    setUser: (user) => {
        let value = JSON.stringify(user);
        localStorage.setItem("amazonCloneUser", value);
    },

    getUser: () => {
        let user = localStorage.getItem("amazonCloneUser");

        if (user) {
            return JSON.parse(user);
        } else {
            return {};
        }
    },

    removeUser: () => {
        localStorage.removeItem("amazonCloneUser");
    },
};
