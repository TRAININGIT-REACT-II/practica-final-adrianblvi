import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteNoteDialog from "./DeleteNoteDialog";
import { format, parseISO } from "date-fns";
import AuthService from "../../services/authService";
import "../../../static/css/note.css";

const CardNote = ({ note }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
  };

  const confirmModal = () => {
    closeModal();

    // fetch("/api/notes/" + note.id, {
    //   method: "DELETE",

    //   headers: {
    //     "api-token": AuthService.getCurrentUser(),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json.error) {
    //       console.log(json.error);
    //     }
    //     console.log(onDelete);
    //     onDelete;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const date = format(parseISO(note.createdAt), "dd/MM/yyyy");

  const details = note.content;
  const detailsSliced =
    details.length > 200 ? details.slice(0, 200) + "  ..." : details;
  const detailsToShow = showDetails ? details : detailsSliced;

  const onClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <Card elevation={0}>
        <CardHeader
          action={
            <div>
              <IconButton onClick={() => console.log("Editing Note")}>
                <CreateOutlinedIcon />
              </IconButton>

              <IconButton onClick={openModal}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </div>
          }
          title={note.title}
          // subheader="September 14, 2016"
          subheader={date}
        />
        <DeleteNoteDialog
          show={showModal}
          onClose={closeModal}
          onClick={confirmModal}
        />
        <CardContent>
          <div onClick={onClick}>
            <Typography variant="body2" color="textSecondary">
              {detailsToShow}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CardNote;
