import { applyMiddleware, combineReducers, createStore } from "redux";
import middleware from "redux-thunk";
import { authReducer } from "./authReducer";
import messageReducer from "./messageReducer";
import { postReducer } from "./postReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  authReducer,
  postReducer,
  userReducer,
  messageReducer,
});
export const store = createStore(reducers, applyMiddleware(middleware));
export type RootState = ReturnType<typeof reducers>;
