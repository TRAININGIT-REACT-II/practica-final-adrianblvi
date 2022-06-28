import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

const CardNote = ({ note, onClick }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
  };

  const editNote = () => {
    history.push("/" + note.id, { note: note });
  };

  const date = format(parseISO(note.createdAt), "dd/MM/yyyy");

  const details = note.content;
  const detailsSliced =
    details.length > 200 ? details.slice(0, 200) + "  ..." : details;
  const detailsToShow = showDetails ? details : detailsSliced;

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <Card elevation={0}>
        <CardHeader
          action={
            <div>
              <IconButton onClick={editNote}>
                <CreateOutlinedIcon />
              </IconButton>

              <IconButton onClick={openModal}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </div>
          }
          title={note.title}
          subheader={date}
        />
        <DeleteNoteDialog
          show={showModal}
          onClose={closeModal}
          onClick={onClick}
        />
        <CardContent>
          <div onClick={handleShowDetails}>
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
