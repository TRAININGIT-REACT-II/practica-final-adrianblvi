import React, { useState, useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { LOGIN_STATE } from "../../constants/loginState";
import LoginAlert from "../Alerts/LoginAlert";
import SesionAlert from "../Alerts/SesionAlert";
import UserContext from "../../contexts/userContext";
import NameContext from "../../contexts/nameContext";
import "../../../static/css/login.css";

const Login = () => {
  const history = useHistory();

  const user = useContext(UserContext);
  const name = useContext(NameContext);

  const { state } = useLocation();
  const displayAlert = state && state.msg != null && !user.signedIn;

  const [formState, setFormState] = useState(LOGIN_STATE);
  const [msgError, setMsgError] = useState(null);
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    const error = showError ? false : true;
    setShowError(error);
  }, [msgError]);

  console.log("DisplayAlert: " + displayAlert);
  console.log("Msg Error " + msgError);
  console.log("Show Error " + showError);
  if (state!= null) {
    console.log("State: " + state.msg);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    fetch("/api/login", {
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
        if (json.error) {
          setMsgError("Usuario o contraseña incorrectos");
        } else {
          console.log(json);
          user.updateUser(true);
          name.updateName(json.name);
          localStorage.setItem("user", json.token);
          history.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
      {displayAlert && <SesionAlert msg={state.msg} />}
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
      <button>Iniciar sesión</button>
    </form>
  );
};

export default Login;
