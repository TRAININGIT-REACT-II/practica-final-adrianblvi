import React, { useState } from "react";

const SucessNoteAlert = (props) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {props.msg}
      </Alert>
    </Snackbar>
  );
};

export default SucessNoteAlert;
