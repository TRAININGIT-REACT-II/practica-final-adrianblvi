import React, { useState, useContext } from "react";
import { Route, useHistory } from "react-router";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ButtonGroup from "@mui/material/ButtonGroup";
import { NOTES_LAYOUT } from "../../constants/notesLayout";
import NoteLayout from "../../contexts/noteLayout";
import NewNote from "./NewNote";
import "../../../static/css/note.css";

const ToggleNoteLayout = () => {
  const [layoutState, setLayoutState] = useState(NOTES_LAYOUT);

  const layout = useContext(NoteLayout);

  const [alignment, setAlignment] = useState("left");

  const history = useHistory();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const toggleToList = () => {
    if (layoutState === NOTES_LAYOUT.card) {
      setLayoutState(NOTES_LAYOUT.list);
      layout.update(NOTES_LAYOUT.list);
    }
  };

  const toogleToCard = () => {
    if (layoutState === NOTES_LAYOUT.list) {
      setLayoutState(NOTES_LAYOUT.card);
      layout.update(NOTES_LAYOUT.card);
    }
  };

  const handleAddNote = () => {
    console.log("Redirigimos a nueva nota");
    history.push("/notes/new");
  };

  return (
    <div id="mount-point">
      <Stack direction="row" spacing={4}>
        <ButtonGroup>
          <Button
            variant="outlined"
            onClick={handleAddNote}
            startIcon={<NoteAddOutlinedIcon />}
          >
            Añadir Nota
          </Button>
        </ButtonGroup>

        <ToggleButtonGroup
          value={alignment}
          aria-label="text alignment"
          exclusive
          onChange={handleAlignment}
        >
          <ToggleButton
            value="left"
            aria-label="left aligned"
            onClick={toggleToList}
          >
            <FormatListBulletedOutlinedIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton
            value="center"
            aria-label="centered"
            onClick={toogleToCard}
          >
            <GridViewOutlinedIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
};

export default ToggleNoteLayout;
