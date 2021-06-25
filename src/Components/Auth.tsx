import { Button, FormControl, TextField } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { logInT, signUpT } from "../redux/authReducer";
import style from "./Auth.module.css";

export default function Auth() {
  const [typePage, setTypePage] = useState("LogIn");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();

  const signUp = ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    dispatch(signUpT(email, password, username));
  };

  const logIn = ({ email, password }: { email: string; password: string }) => {
    dispatch(logInT(email, password));
  };

  return (
    <div className={style.auth}>
      {typePage === "LogIn" && (
        <div>
          <h2>Вход</h2>
          <form onSubmit={handleSubmit(logIn)}>
            <div>
              <TextField
                className={style.input}
                {...register("email")}
                label="Email"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                className={style.input}
                {...register("password")}
                label="Password"
                variant="outlined"
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              Войти
            </Button>
          </form>
          Нет аккаунта?
          <Button
            style={{ color: "#4287f5", marginLeft: 3 }}
            onClick={() => setTypePage("SignUp")}
          >
            Зарегестрируйтесь!
          </Button>
        </div>
      )}
      {typePage === "SignUp" && (
        <div className={style.signUp}>
          <h2>Регистрация</h2>
          <form onSubmit={handleSubmit(signUp)}>
            <div>
              <TextField
                className={style.input}
                {...register("email", { required: true })}
                label="Email"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                className={style.input}
                {...register("username", { required: true })}
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                className={style.input}
                {...register("password", { required: true })}
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
            </div>

            <Button variant="contained" color="primary" type="submit">
              Зарегестрироваться
            </Button>
          </form>
          <Button onClick={() => setTypePage("LogIn")}>Вход</Button>
        </div>
      )}
    </div>
  );
}
