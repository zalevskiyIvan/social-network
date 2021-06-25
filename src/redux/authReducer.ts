import { Dispatch } from "react";
import { authApi } from "../DAL/authAPI";
import { ActionTypes, userType } from "../types";

const initialState = {
  user: null as userType | null,
};
type stateType = typeof initialState;
export const authReducer = (
  state = initialState,
  action: actionType
): stateType => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: action.user,
      };
    case "SIGN_UP":
      return {
        ...state,
        user: action.user,
      };

    case "IS_AUTH":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

const actions = {
  logIn: (user: userType) => ({ type: "LOG_IN", user } as const),
  signUp: (user: userType) => ({ type: "SIGN_UP", user } as const),
  isAuth: (user: userType | null) => ({ type: "IS_AUTH", user } as const),
};

type actionType = ActionTypes<typeof actions>;

export const logInT = (email: string, password: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await authApi.logIn(email, password);
    dispatch(actions.logIn(res.data));
  };
};

export const signUpT = (email: string, password: string, username: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await authApi.signUp(email, password, username);
    dispatch(actions.signUp(res.data));
  };
};

export const isAuthT = () => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await authApi.isAuth();
    if (!res.err) dispatch(actions.isAuth(res.data));
    if (res.err) {
      dispatch(actions.isAuth(null));
    }
  };
};
