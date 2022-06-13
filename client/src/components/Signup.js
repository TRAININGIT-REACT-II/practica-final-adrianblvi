import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../static/css/login.css";
import { LOGIN_STATE } from "../constants/loginState";

const Signup = () => {
  const [formState, setFormState] = useState(LOGIN_STATE);

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    fetch("/api/register", {
      method: "POST",

      body: JSON.stringify({
        username: formState.username,
        password: formState.password,
      }),
      // Modificamos la cabecera
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      // Obtenemos la respuesta
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        history.push("/");
      })
      .catch((err) => console.error(err));
  };

  const onChange = (key) => {
    return (e) =>
      setFormState({
        ...formState,
        [key]: e.target.value,
      });
  };

  return (
    <form className="login" onSubmit={onSubmit}>
      <label htmlFor="username">Usuario</label>
      <input
        id="username"
        type="text"
        required={true}
        value={formState.username}
        onChange={onChange("username")}
      />
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        required={true}
        value={formState.password}
        onChange={onChange("password")}
      />
      <button>Registarse</button>
    </form>
  );
};

export default Signup;
