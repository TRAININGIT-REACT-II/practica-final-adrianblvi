import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ToggleNoteLayout from "./ToggleNoteLayout";
import { NOTES_LAYOUT } from "../../constants/notesLayout";
import NoteLayout from "../../contexts/noteLayout";
import AuthService from "../../services/authService";
import GridMap from "./GridMap";
import ListMap from "./ListMap";
import "../../../static/css/note.css";

const NoteLayoutChange = () => {
  const vista = useContext(NoteLayout);
  const [layout, setLayout] = useState(vista.current);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayGrid = !loading && layout === NOTES_LAYOUT.card;
  const displayList = !loading && layout === NOTES_LAYOUT.list;

  const style = { margin: "0 auto", width: "100%", height: "100%" };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (notes.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [notes]);

  const getNotes = () => {
    fetch("/api/notes", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-token": AuthService.getCurrentUser(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const notesBD = json;
        setNotes(notesBD);
      })
      .catch((err) => console.error(err));
  };

  const confirmModal = () => {
    // closeModal();
    console.log("jdfhkjsdf");
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

  return (
    <NoteLayout.Provider value={{ current: layout, updateLayout: setLayout }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={style}
      >
        <Grid item xs={2} sm={4} md={4}>
          <h1 className="app-header">Notas:</h1>
        </Grid>
        <Grid item xs={2} sm={4} md={4}></Grid>
        <Grid item xs={2} sm={4} md={4}>
          <ToggleNoteLayout />
        </Grid>

        {displayGrid && <GridMap notes={notes} onClick={confirmModal} />}
        {displayList && <ListMap notes={notes} />}

        <Grid item xs={2} sm={4} md={4}></Grid>
      </Grid>
    </NoteLayout.Provider>
  );
};

export default NoteLayoutChange;
