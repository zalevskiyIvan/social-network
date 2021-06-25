import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../common/hooks/useSelector";
import { getUserById } from "../../redux/userReducer";
import { conversationType, userType } from "../../types";
import style from "./Conversation.module.css";

export default function Conversation({
  // conversation,
  userIds,
  currentUser,
}: {
  // conversation: conversationType;
  userIds: number[];
  currentUser: userType | null; //! спросить как типизировать
}) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  useEffect(() => {
    const friendIds = userIds.filter(
      (member: number) => member !== currentUser?.id
    );
    if (!!friendIds.length) dispatch(getUserById(friendIds));
  }, []);

  return (
    <ul>
      <li>
        {users?.map((user) => {
          return <div>{user?.username}</div>;
        })}
      </li>
    </ul>
  );
}
