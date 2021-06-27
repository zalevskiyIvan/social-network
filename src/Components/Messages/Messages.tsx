import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "../../common/hooks/useSelector";
import style from "./Messages.module.css";
import {
  actions,
  addConversationT,
  addMessageT,
  getConversations,
  getCurrentMessagesT,
} from "../../redux/messageReducer";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Conversation from "./Conversations/Conversation";
import Message from "./Message/Message";
import { conversationType } from "../../types";
import { Button } from "@material-ui/core";

export default function Messages() {
  const user = useSelector((state) => state.authReducer.user);
  const conversations = useSelector(
    (state) => state.messageReducer.conversations
  );
  const [currentChat, setCurrentChat] = useState(
    null as null | conversationType
  );
  const currentMessages = useSelector((state) => state.messageReducer.messages);

  const socket = io("http://localhost:3001");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    socket.on("getMessage", (data) => {
      dispatch(actions.setMessage(data));
    });
  }, []);

  useEffect(() => {
    user && dispatch(getConversations(user.id));
  }, [user]);

  const selectChat = (conv: conversationType) => {
    if (conv.id) {
      dispatch(getCurrentMessagesT(conv.id));
      setCurrentChat(conv);
    }
  };
  useEffect(() => {
    socket.emit("addUser", user?.id);
  }, [user]);

  const addMessage = ({ text }: { text: string }) => {
    if (user && currentChat?.id) {
      const reciverId = currentChat.members.find(
        (memberId) => memberId !== user.id
      );

      const data = { senderId: user.id, conversationId: currentChat?.id, text };
      socket.emit("sendMessage", {
        senderId: user.id,
        reciverId,
        text,
      });

      dispatch(addMessageT(data));
    }
  };
  const addFriend = ({ friendName }: { friendName: string }) => {
    dispatch(addConversationT(friendName));
  };

  return (
    <>
      <form onSubmit={handleSubmit(addFriend)}>
        <TextField
          {...register("friendName", { required: true })}
          label="Введите имя друга..."
        />
        <Button
          variant="contained"
          color="primary"
          className={style.searchFriend}
          type="submit"
        >
          Найти
        </Button>
      </form>
      <div className={style.messages}>
        <div className={style.conversations}>
          {conversations.map((conv) => {
            return (
              <div onClick={() => selectChat(conv)}>
                <Conversation conversation={conv} currentUser={user} />
              </div>
            );
          })}
        </div>
        <div className={style.chat}>
          {currentMessages.map((message) => {
            return (
              <Message message={message} isMy={message.senderId === user?.id} />
            );
          })}
          {currentChat && (
            <form
              onSubmit={handleSubmit(addMessage)}
              className={style.addMessage}
            >
              <TextField
                {...register("text", { required: true })}
                className={style.input}
                id="standard-basic"
                label="Новое сообщение..."
              />
            </form>
          )}
        </div>
      </div>
    </>
  );
}
