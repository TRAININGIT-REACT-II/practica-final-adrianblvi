import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { NOTES_LAYOUT } from "../../constants/notesLayout";
import NoteLayout from "../../contexts/noteLayout";
import SortContext from "../../contexts/sortContext";
import SortByContext from "../../contexts/sortByContext";
import SortOrderContext from "../../contexts/sortOrderContext";
import Popover from "@mui/material/Popover";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
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

const ToggleNoteLayout = () => {
  const options = ["Título", "Fecha actualización", "Fecha creación"];

  // Sort notes by
  const sortContext = useContext(SortContext);
  // const [sort, setSort] = useState(SortContext.current);

  const sortBy = useContext(SortByContext);
  const sortOrderContext = useContext(SortOrderContext);
  const [sortOrder, setSortOrder] = useState(sortOrderContext);

  const [alignment, setAlignment] = useState("center");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [arrow, setArrow] = useState("");
  const layout = useContext(NoteLayout);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  let history = useHistory();

  useEffect(() => {
    console.log("current", sortContext.current);
  }, []);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment != null) {
      setAlignment(newAlignment);
    }
  };

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    if (index === selectedIndex) {
      // cambiamos none por up y up por down
      if (arrow === "up") {
        setArrow("down");
      } else if (arrow === "down") {
        setArrow("none");
      } else {
        setArrow("up");
      }
    } else {
      setArrow("up");
    }

    sortContext.update(!sortContext.current);
    setSelectedIndex(index);
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
            <MoreVertOutlinedIcon fontSize="small" onClick={handleClick} />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{ width: "100%", maxWidth: 360 }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {/* {index === selectedIndex && ( */}
                  <ListItemIcon>
                    {index === selectedIndex && arrow === "up" && (
                      <ArrowUpwardOutlinedIcon fontSize="small" />
                    )}
                    {index === selectedIndex && arrow === "down" && (
                      <ArrowDownwardOutlinedIcon fontSize="small" />
                    )}
                  </ListItemIcon>

                  <ListItemText>{option}</ListItemText>
                </MenuItem>
              ))}
            </Popover>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
};

export default ToggleNoteLayout;
