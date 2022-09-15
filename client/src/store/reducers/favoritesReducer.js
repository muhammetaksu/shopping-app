export const favoritesReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TO_FAVORITES":
            return (state = [action.payload, ...state]);
        case "REMOVE_FROM_FAVORITES":
            return (state = state.filter((q) => q.id != action.payload.id));
        case "REMOVE_ALL_FAVORITES":
            return (state = []);
        case "SET_LOCAL_FAVORITES":
            return (state = action.payload);
        default:
            return state;
    }
};
