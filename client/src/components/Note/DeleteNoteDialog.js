import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteNoteDialog = ({ show, onClose, onClick }) => {
  const dialogRef = useRef(null);
  const modalDialogRef = useRef(document.getElementById("modals"));

  useEffect(() => {
    const dialogEl = document.createElement("div");
    dialogEl.classList.add("modal-hidden");

    modalDialogRef.current.appendChild(dialogEl);
    dialogRef.current = dialogEl;

    return () => modalDialogRef.current.removeChild(dialogRef.current);
  }, []);

  useEffect(() => {
    if (dialogRef.current != null) {
      if (show) {
        dialogRef.current.classList.remove("modal-hidden");
      } else {
        dialogRef.current.classList.add("modal-hidden");
      }
    }
  }, [show]);

  const [open, setOpen] = useState(true);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  if (show && dialogRef.current != null) {
    return createPortal(
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Eliminar nota"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Está a punto de eleminar una nota, ¿Está seguro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} autoFocus>
              NO
            </Button>
            <Button onClick={onClick}>SÍ</Button>
          </DialogActions>
        </Dialog>
      </div>,
      dialogRef.current
    );
  } else {
    // No renderizamos nada si no hace falta
    return null;
  }
};

export default DeleteNoteDialog;
