import { useFormik } from "formik";
import * as Yup from "yup";

import { useContext } from "react";
import AppContext from "../context/app-context";
import classes from "./Login.module.css";

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

  async function onLoginHandler(values) {
    try {
      const raw = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: values.user,
          password: values.password,
        }),
      });
      if (!raw.ok) {
        throw new Error("Credenciales incorrectas.");
      }
      const data = await raw.json();
      ctx.setUserInfo(data);
      ctx.setIsLoggedIn(true);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <main className={classes.container}>
      <form className={classes.loginForm} onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="user" placeholder="número de cédula">
            Usuario
          </label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.user}
            onChange={formik.handleChange}
            type="text"
            name="user"
            id="user"
          />
          {formik.errors.user && formik.touched.user ? (
            <div className="validation-error">{formik.errors.user}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="pass" placeholder="contraseña">
            Contraseña
          </label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="validation-error">{formik.errors.password}</div>
          ) : null}
        </div>

        <div>
          <button type="submit">Iniciar sesión</button>
        </div>
      </form>
    </main>
  );
};

export default LoginFormik;
