import React, { useState, useContext } from "react";
import { Route, useHistory } from "react-router";
import { NOTES_LAYOUT } from "../../constants/notesLayout";
import NoteLayout from "../../contexts/noteLayout";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ButtonGroup from "@mui/material/ButtonGroup";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import "../../../static/css/note.css";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";

const ToggleNoteLayout = () => {
  const [alignment, setAlignment] = useState("center");

  const history = useHistory();

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment != null) {
      setAlignment(newAlignment);
    }
  };

  const layout = useContext(NoteLayout);

  const toggleToList = () => {
    if (layout.current === NOTES_LAYOUT.card) {
      layout.updateLayout(NOTES_LAYOUT.list);
    }
  };

  const toogleToCard = () => {
    if (layout.current === NOTES_LAYOUT.list) {
      layout.updateLayout(NOTES_LAYOUT.card);
    }
  };

  const handleAddNote = () => {
    console.log("Redirigimos a nueva nota");
    history.push("/new");
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
        <ToggleButtonGroup aria-label="text alignment" exclusive>
          <ToggleButton value="left" aria-label="left aligned">
            <MoreVertOutlinedIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
};

export default ToggleNoteLayout;
