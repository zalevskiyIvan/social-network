import { Dispatch } from "react";
import { postAPI } from "../DAL/postApi";
import { ActionTypes, postType, userType } from "../types";

const initialState = {
  posts: [] as postType[],
};

type stateType = typeof initialState;
export const postReducer = (
  state = initialState,
  action: actionType
): stateType => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [{ ...action.postCred }, ...state.posts],
      };
    case "GET_POSTS":
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};

const actions = {
  addPost: (postCred: postType) => ({ type: "ADD_POST", postCred } as const),
  getPost: (posts: postType[]) => ({ type: "GET_POSTS", posts } as const),
};

type actionType = ActionTypes<typeof actions>;

export const addPostT = (postCred: postType, userId?: number) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await postAPI.addPost(postCred, userId);
    dispatch(actions.addPost(res.data));
  };
};
export const getPostsT = () => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await postAPI.getPost();
    dispatch(actions.addPost(res.data));
  };
};
