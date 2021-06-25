import axios, { AxiosResponse } from "axios";
import { conversationType, messageType } from "../types";

const instanse = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/api/conversations",
});

export const conversationAPI = {
  getConversations: (
    userId: number
  ): Promise<AxiosResponse<conversationType[]>> => {
    return instanse.get(`/?userId=${userId}`);
  },
};
