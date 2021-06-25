import React, { useEffect } from "react";
import "./App.css";
import Auth from "./Components/Auth";
import Main from "./Components/Main/Main";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Messages from "./Components/Messages/Messages";
import { isAuthT } from "./redux/authReducer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthT());
  }, []);
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Switch>
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/messages" render={() => <Messages />} />
          <Route path="/" render={() => <Main />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
