import { useHistory } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AppContext from "../context/app-context";

const Login = () => {
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const onChangeUserInputHandler = (e) => {
    setUserInput(e.target.value);
  };

  const onChangePasswordInputHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const ctx = useContext(AppContext);

  const onLoginHandler = async (e) => {
    try {
      e.preventDefault();
      const raw = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userInput,
          password: passwordInput,
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
  };

  // retrieve from local storage using useEffect
  const history = useHistory();

  useEffect(() => {
    if (ctx.isLoggedIn) {
      history.replace("/roles-pago/");
    }
    setUserInput("");
    setPasswordInput("");
  }, [ctx.isLoggedIn, history]);

  return (
    <main>
      <form onSubmit={onLoginHandler}>
        <label htmlFor="user">Usuario</label>
        <input
          onChange={onChangeUserInputHandler}
          id="user"
          type="text"
          value={userInput}
        />

        <label htmlFor="pass">Contraseña</label>
        <input
          onChange={onChangePasswordInputHandler}
          id="pass"
          type="password"
          value={passwordInput}
        />

        <button>Iniciar Sesión</button>
      </form>
    </main>
  );
};

export default Login;
