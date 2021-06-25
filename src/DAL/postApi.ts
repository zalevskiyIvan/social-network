import axios, { AxiosResponse } from "axios";
import { postType, userType } from "../types";

const instanse = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/api/posts",
});

export const postAPI = {
  addPost: (
    postCred: postType,
    userId?: number
  ): Promise<AxiosResponse<postType>> => {
    return instanse.post("/", { ...postCred, userId });
  },
  getPost: (): Promise<AxiosResponse<postType>> => {
    return instanse.get("/");
  },
};
