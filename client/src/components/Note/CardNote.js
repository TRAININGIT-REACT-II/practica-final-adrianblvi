import React, { useState, useEffect } from "react";
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
import "../../../static/css/note.css";

const CardNote = ({ note }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (note != undefined) {
      if (note.createdAt != note.updatedAt) {
        setDate(format(parseISO(note.updatedAt), "dd/MM/yyyy"));
      } else {
        setDate(format(parseISO(note.createdAt), "dd/MM/yyyy"));
      }
    }
  }, []);

  const history = useHistory();

  const details = note.content;

  const detailsSliced =
    details.length > 200 ? details.slice(0, 200) + "  ..." : details;

  const detailsToShow = showDetails ? details : detailsSliced;

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
  };

  const editNote = () => {
    history.push("/" + note.id, { note: note });
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const confirmModal = () => {
    closeModal();
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
          onClick={confirmModal}
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
