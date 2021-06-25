import axios, { AxiosResponse } from "axios";
import { postType, userType } from "../types";

const instanse = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/api/users",
});

export const userAPI = {
  getOne: (userId: number): Promise<AxiosResponse<userType>> => {
    return instanse.get(`/?userId=${userId}`);
  },
  getMany: async (usersId: number[]): Promise<AxiosResponse<userType>[]> => {
    const promiseList:any = []
    usersId.forEach(id => promiseList.push(instanse.get(`/?userId=${id}`)))
    const responses: any = await Promise.all(promiseList)
    return responses
    // return instanse.get(`/?userId=${userId}`);
  },
};
