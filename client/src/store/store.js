import { createStore, applyMiddleware } from "redux";
import mainReducer from "./reducers/mainReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { loggerMiddleware } from "./middleware/loggerMiddleware";

const composeEnhancers = composeWithDevTools({});

const middlewareList = [thunk];

const enhancer = composeEnhancers(applyMiddleware(...middlewareList));

export const store = createStore(mainReducer, enhancer);
