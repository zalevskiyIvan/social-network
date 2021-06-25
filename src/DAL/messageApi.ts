import axios, { AxiosResponse } from "axios";
import { messageType } from "../types";

const instanse = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/api/messages",
});

export const messageAPI = {
  getCurrent: (id: number): Promise<AxiosResponse<messageType[]>> => {
    return instanse.get(`/?conversationId=${id}`);
  },
  addMessage: (data: messageType): Promise<AxiosResponse<messageType>> => {
    return instanse.post("/", data);
  },
};
