import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const NotSignedIn = () => {
  const handleIniciarSesion = () => {};

  const handleRegistrarse = () => {};

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
