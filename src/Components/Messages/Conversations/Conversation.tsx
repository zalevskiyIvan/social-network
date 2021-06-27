import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../common/hooks/useSelector";
import { getUserById } from "../../../redux/userReducer";
import { conversationType, userType } from "../../../types";
import style from "./Conversation.module.css";

export default function Conversation({
  conversation,
  currentUser,
}: {
  conversation: conversationType;
  currentUser: userType | null; //! спросить как типизировать
}) {
  const dispatch = useDispatch();
  // const users = useSelector((state) => state.userReducer.users);
  const [user, setUser] = useState(null as any);
  useEffect(() => {
    const getUser = async () => {
      const friendId = conversation.members.find(
        (id) => id !== currentUser?.id
      );
      const friend = await axios.get(
        `http://localhost:3001/api/users/?userId=${friendId}`
      );
      setUser(friend.data);
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className={style.user}>
      <span>{user?.username}</span>
    </div>
  );
}
