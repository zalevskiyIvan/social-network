import React from "react";
import { messageType } from "../../../types";
import style from "./Message.module.css";
import { format } from "timeago.js";

export default function Message({
  message,
  isMy,
}: {
  message: messageType;
  isMy: boolean;
}) {
  return (
    <div className={isMy ? style.myMessage : style.otherMessage}>
      <div>
        <span>{message.text}</span>
      </div>
      <span className={style.createdAt}>
        {message.createdAt && format(message.createdAt)}
      </span>
    </div>
  );
}
