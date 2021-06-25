import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "../../common/hooks/useSelector";
import { getPostsT, addPostT } from "../../redux/postReducer";
import { postType } from "../../types";
import style from "./Main.module.css";

export default function Main() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.postReducer.posts);
  const userId = useSelector((state) => state.authReducer.user.id);

  useEffect(() => {
    dispatch(getPostsT());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [addMode, setAddMode] = useState(false);

  const addPost = (v: postType) => {
    dispatch(addPostT(v, userId));
    setAddMode(false);
  };
  return (
    <div>
      <div onClick={() => setAddMode(true)} className={style.newRecipe}>
        <div className={style.plus}>
          <img src="/imgs/Plus.png" />
        </div>
        <h1 className={style.h1}>Новый рецепт</h1>
      </div>

      {addMode && (
        <div>
          <form
            onSubmit={handleSubmit(addPost)}
            autoComplete="off"
            className={style.form}
          >
            <div className={style.input}>
              <TextField
                {...register("title", { required: true })}
                id="outlined-basic"
                label="title"
                variant="outlined"
              />
              {errors.title && <div className={style.error}>Required*</div>}
            </div>
            <div className={style.input}>
              <TextField
                {...register("description", { required: true })}
                id="outlined-basic"
                label="description"
                variant="outlined"
              />
              {errors.description && (
                <div className={style.error}>Required*</div>
              )}
            </div>
            <div className={style.input}>
              <TextField
                {...register("img", { required: true })}
                id="outlined-basic"
                label="img"
                variant="outlined"
              />
              {errors.img && <div className={style.error}>Required*</div>}
            </div>
            <br />
            <Button variant="contained" color="primary" type="submit">
              Создать пост
            </Button>
          </form>
        </div>
      )}
      {state &&
        state.map((i: postType) => {
          return (
            <div className={style.post}>
              <h2>{i.title}</h2>
              <img src={i.img} alt="" />
              <p>{i.description}</p>
            </div>
          );
        })}
    </div>
  );
}
