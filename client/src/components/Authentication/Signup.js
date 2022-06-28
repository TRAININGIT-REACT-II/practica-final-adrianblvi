import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LOGIN_STATE } from "../../constants/loginState";
import UserContext from "../../contexts/userContext";
import LoginAlert from "../Alerts/LoginAlert";
import "../../../static/css/login.css";

const Signup = () => {
  const [formState, setFormState] = useState(LOGIN_STATE);
  const [msgError, setMsgError] = useState(null);
  const [showError, setShowError] = useState(true);

  const history = useHistory();

  const user = useContext(UserContext);

  useEffect(() => {
    const error = showError ? false : true;
    setShowError(error);
    console.log("UEF:Mensaje de error: " + msgError);
  }, [msgError]);

  const onSubmit = (e) => {
    e.preventDefault();

    fetch("/api/register", {
      method: "POST",

      body: JSON.stringify({
        username: formState.username,
        password: formState.password,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setMsgError("Usuario ya registrado en el sistema");
        } else {
          console.log(json);
          user.updateUser(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });

    history.push("/");
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
      {showError && <LoginAlert msg={msgError} />}
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
