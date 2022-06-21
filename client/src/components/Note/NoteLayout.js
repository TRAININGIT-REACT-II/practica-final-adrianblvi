import React, { useState } from "react";
import { Route, useHistory } from "react-router";
import Grid from "@mui/material/Grid";
import ToggleNoteLayout from "./ToggleNoteLayout";
import NewNote from "./NewNote";
import "../../../static/css/note.css";

const NoteLayoutChange = () => {
  const style = { margin: "0 auto", width: "100%", height: "100%" };

  const [notesNumber, setNotesNumber] = useState(0);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      style={style}
    >
      <Grid item xs={2} sm={4} md={4}>
        <h1 className="app-header">Notas: {notesNumber}</h1>
      </Grid>
      <Grid item xs={2} sm={4} md={4}></Grid>
      <Grid item xs={2} sm={4} md={4}>
        <ToggleNoteLayout />
      </Grid>
      <Route path="/notes/new">
        <NewNote />
      </Route>
    </Grid>
  );
};

export default NoteLayoutChange;
