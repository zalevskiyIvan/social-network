type properties<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionTypes<T extends { [key: string]: (...args: any[]) => any }> =
  ReturnType<properties<T>>;

export type userType = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type postType = {
  title: string;
  description: string;
  img: string;
  userId: number;
};

export type messageType = {
  id?: number;
  senderId: number;
  text: string;
  conversationId: number;
  createdAt?: string;
};

export type conversationType = {
  id?: number;
  members: number[];
};
