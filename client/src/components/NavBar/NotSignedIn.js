import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const NotSignedIn = () => {
  const history = useHistory();

  const handleIniciarSesion = () => {
    history.push("/login");
  };

  const handleRegistrarse = () => {
    history.push("/signup");
  };

  return (
    <Box>
      <Button color="inherit" onClick={handleIniciarSesion}>
        Iniciar Sesión
      </Button>
      <Button color="inherit" onClick={handleRegistrarse}>
        Registrarse
      </Button>
    </Box>
  );
};

export default NotSignedIn;
