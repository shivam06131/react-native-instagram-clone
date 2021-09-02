import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

export const Store = createStore(reducers, applyMiddleware(thunk));
