import React, { useState, useEffect } from "react";

import NewNote from "./NewNote";
import { Route, Link, useHistory } from "react-router";
import "../../../static/css/note.css";

const NotesList = () => {
  const history = useHistory();
  let [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   getNotes();
  // }, []);

  const getNotes = () => {
    notes = NotesService.getAllNotes();
    if (notes != undefined) {
      setNotes(notes);
    } else {
      setNotes({});
    }
  };

  const handleAddNote = () => {
    console.log("Redirigimos a nueva nota");
    history.push("/notes/new");
  };

  return (
    <div className="notes-app">
      <h2 className="app-header">Notas: 5</h2>
      <button onClick={handleAddNote}>Add note</button>
      <Route path="/notes/new">
        <NewNote />
      </Route>
    </div>
  );
};

export default NotesList;
