import axios, { AxiosResponse } from "axios";
import { userType } from "../types";

const instanse = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/api/auth/",
});

export const authApi = {
  logIn: (
    email: string,
    password: string
  ): Promise<AxiosResponse<userType>> => {
    return instanse.post("log-in", { email, password });
  },
  signUp: (
    email: string,
    password: string,
    username: string
  ): Promise<AxiosResponse<userType>> => {
    return instanse.post("sign-up", { email, password, username });
  },
  isAuth: (): any => {
    return instanse.get("is-auth").catch((err) => ({ err }));
  },
};
