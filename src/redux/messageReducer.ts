import { Dispatch } from "react";
import { conversationAPI } from "../DAL/conversationAPI";
import { messageAPI } from "../DAL/messageApi";
import { userAPI } from "../DAL/userApi";
import { ActionTypes, conversationType, messageType } from "../types";

const initialState = {
  messages: [] as messageType[],
  conversations: [] as conversationType[],
};
type stateType = typeof initialState;

export default (state = initialState, action: actionType): stateType => {
  switch (action.type) {
    case "GET_MESSAGES":
      return {
        ...state,
        messages: action.messages,
      };
    case "ADD_MESSAGES":
      return {
        ...state,
        messages: [action.message, ...state.messages],
      };
    case "GET_CONVERSATIONS":
      return {
        ...state,
        conversations: action.conversations,
      };
    default:
      return state;
  }
};
const actions = {
  getCurrentMessages: (messages: messageType[]) =>
    ({ type: "GET_MESSAGES", messages } as const),
  addMessage: (message: messageType) =>
    ({ type: "ADD_MESSAGES", message } as const),
  getConversations: (conversations: conversationType[]) =>
    ({ type: "GET_CONVERSATIONS", conversations } as const),
};

type actionType = ActionTypes<typeof actions>;

export const getCurrentMessagesT = (conversationId: number) => {
  return async (dispatch: Dispatch<actionType>) => {
    const { data } = await messageAPI.getCurrent(conversationId);
    dispatch(actions.getCurrentMessages(data));
  };
};

export const addMessageT = (messageCred: messageType) => {
  return async (dispatch: Dispatch<actionType>) => {
    const { data } = await messageAPI.addMessage(messageCred);
    dispatch(actions.addMessage(data));
  };
};

export const getConversations = (userId: number) => {
  return async (dispatch: Dispatch<actionType>) => {
    const { data } = await conversationAPI.getConversations(userId);
    dispatch(actions.getConversations(data));
  };
};
