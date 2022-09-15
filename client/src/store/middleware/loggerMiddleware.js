export const loggerMiddleware = (store) => (next) => (action) => {
    console.group("ACTION TYPE", action.type);
    console.info("DISPATCHING", action);
    let result = next(action);
    console.log("NEXT STATE", store.getState());
    console.groupEnd();
    return result;
};
