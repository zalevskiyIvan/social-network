import { Dispatch } from "react";
import { userAPI } from "../DAL/userApi";
import { ActionTypes, userType } from "../types";

const initialState = {
  users: [] as userType[],
};
type stateType = typeof initialState;

export default (state = initialState, action: actionType): stateType => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        users: [...state.users, action.user],
      };

    default:
      return state;
  }
};
const actions = {
  getUser: (user: userType) => ({ type: "GET_USER", user } as const),
};

type actionType = ActionTypes<typeof actions>;

export const getUserById = (usersId: number[]) => {
  return async (dispatch: Dispatch<actionType>) => {
    const responses = await userAPI.getMany(usersId);
    responses.map((res) => {
      dispatch(actions.getUser(res.data));
    });
  };
};
