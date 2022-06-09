import { useFormik } from "formik";
import * as Yup from "yup";

import { useContext } from "react";
import AppContext from "../context/app-context";
import classes from "./Login.module.css";
import useHttp from "../hooks/useHttp";

import { Button, TextField } from "@mui/material";

const LoginFormik = () => {
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    onSubmit: onLoginHandler,
    validationSchema: Yup.object({
      user: Yup.string()
        .min(10, "El número de cédula debe tener 10 dígitos.")
        .required("Campo obligatorio."),
      password: Yup.string().required("Campo obligatorio"),
    }),
  });

  const ctx = useContext(AppContext);

  const { sendRequest, requestError, isLoading } = useHttp();

  function onLoginHandler(values) {
    sendRequest(
      {
        url: "http://localhost:8080/auth/login",
        method: "POST",
        body: {
          user: values.user,
          password: values.password,
        },
      },
      (data) => {
        ctx.setUserInfo(data);
        ctx.setIsLoggedIn(true);
      }
    );
  }

  return (
    <main className={classes.container}>
      <form className={classes.loginForm} onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            variant="standard"
            onBlur={formik.handleBlur}
            value={formik.values.user}
            onChange={formik.handleChange}
            type="text"
            name="user"
            label="Usuario"
          />
          {formik.errors.user && formik.touched.user ? (
            <div className="validation-error">{formik.errors.user}</div>
          ) : null}
        </div>
        <div>
          <TextField
            variant="standard"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            name="password"
            label="Contraseña"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="validation-error">{formik.errors.password}</div>
          ) : null}
        </div>

        <div>
          <Button variant="contained" type="submit">
            Iniciar sesión
          </Button>
        </div>
      </form>
    </main>
  );
};

export default LoginFormik;
