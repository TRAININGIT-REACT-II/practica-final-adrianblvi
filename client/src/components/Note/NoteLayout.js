import React, { useState, useEffect } from "react";
import { Route } from "react-router";
import Grid from "@mui/material/Grid";
import ToggleNoteLayout from "./ToggleNoteLayout";
import { NOTES_LAYOUT } from "../../constants/notesLayout";
import NoteLayout from "../../contexts/noteLayout";
import AuthService from "../../services/authService";

import "../../../static/css/note.css";
import GridMap from "./GridMap";
import ListMap from "./ListMap";

const NoteLayoutChange = () => {
  const [layout, setLayout] = useState(NOTES_LAYOUT.card);

  useEffect(() => {
    console.log("Layout: " + layout);
  }, [layout]);

  const style = { margin: "0 auto", width: "100%", height: "100%" };

  const notes = [
    { name: "John Doe", age: 44 },
    { name: "Jas", age: 45 },
    { name: "asd", age: 44 },
    { name: "asdasd", age: 45 },
    { name: "czxczx", age: 44 },
    { name: "asdqewedq", age: 45 },
  ];

  const render =
    layout === NOTES_LAYOUT.card ? (
      <GridMap notes={notes} />
    ) : (
      <ListMap notes={notes} />
    );

  const getNotes = () => {
    console.log("Obtenemos notas de base de datos...");
    fetch("/api/notes", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-token": AuthService.getCurrentUser(),
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json.stargazers_count))
      .catch((err) => console.error(err));
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
        {render}
        <Grid item xs={2} sm={4} md={4}></Grid>
      </Grid>
    </NoteLayout.Provider>
  );
};

export default NoteLayoutChange;
