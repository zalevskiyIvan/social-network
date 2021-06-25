import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={style.navbar}>
      <Link to="/">Main</Link>
      <Link to="/messages">Messages</Link>
    </div>
  );
}
