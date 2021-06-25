import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "../../common/hooks/useSelector";
import style from "./Messages.module.css";
import {
  addMessageT,
  getConversations,
  getCurrentMessagesT,
} from "../../redux/messageReducer";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Conversation from "../Conversations/Conversation";

export default function Messages() {
  const user = useSelector((state) => state.authReducer.user);
  const conversations = useSelector(
    (state) => state.messageReducer.conversations
  );

  // const currentMessages = useSelector((state) => state.messageReducer.messages);

  // const socket = useRef(io("http://localhost:3001"));
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  // useEffect(() => {
  //   socket.current.on("getMessage", (data) => {
  //     console.log(data);
  //   });
  // });

  useEffect(() => {
    user && dispatch(getConversations(user.id));
    // socket.current = io("http://localhost:3001");
  }, [user]);

  const selectChat = (convId: number) => {
    dispatch(getCurrentMessagesT(convId));
  };
  // useEffect(() => {
  //   socket.current.emit("addUser", user.id);
  // }, []);

  const addMessage = ({ text }: { text: string }) => {
    // socket.current.emit("sendMessage", data);
    // dispatch(addMessageT(data));
  };
  const userIds = conversations.flatMap((e) => e.members);
  // const friendIds = userIds.filter((member: number) => member !== user?.id);
  // console.log(userIds);
  return (
    <div className={style.chat}>
      <Conversation userIds={userIds} currentUser={user} />

      {/* <div className={style.messages}>
        <ul>
          {currentMessages?.map((message) => {
            return <li>{message.text}</li>;
          })}
        </ul>
        <form onSubmit={handleSubmit(addMessage)}>
          <TextField
            {...register("text", { required: true })}
            className={style.input}
            id="standard-basic"
            label="Standard"
          />
        </form>
      </div> */}
    </div>
  );
}
