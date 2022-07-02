import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ToggleNoteLayout from "./ToggleNoteLayout";
import { NOTES_LAYOUT } from "../../constants/notesLayout";
import NoteLayout from "../../contexts/noteLayout";
import SortContext from "../../contexts/sortContext";
import SortByContext from "../../contexts/sortByContext";
import SortOrderContext from "../../contexts/sortOrderContext";
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

  // Sort

  const sortContext = useContext(SortContext);
  const sortByContext = useContext(SortByContext);
  const sortOrderContext = useContext(SortOrderContext);

  const [sort, setSort] = useState(sortContext.current);
  const [sortBy, setSortBy] = useState(sortByContext.sortBy);
  const [sortOrder, setSortOrder] = useState(sortOrderContext.sortOrder);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    console.log("Current:", vista.current);
    console.log("layout:", layout);
  }, [layout]);

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
        // setUnsortedNotes(notesBD);
      })
      .catch((err) => console.error(err));
  };

  const sortNotes = () => {
    if (sort) {
      console.log("_Notes sorted by: " + sortBy);
      if (sortBy === "title") {
        if (sortOrder === "asc") {
          setNotes(
            notes.sort((a, b) =>
              a.title > b.title ? 1 : b.title > a.title ? -1 : 0
            )
          );
        } else if (sortOrder === "desc") {
          setNotes(
            notes.sort((a, b) =>
              b.title > a.title ? 1 : a.title > b.title ? -1 : 0
            )
          );
        }
      } else if (sortBy === "updated") {
        if (sortOrder === "asc") {
          setNotes(
            notes.sort((a, b) =>
              a.updatedAt > b.updatedAt ? 1 : b.updatedAt > a.updatedAt ? -1 : 0
            )
          );
        } else if (sortOrder === "desc") {
          setNotes(
            notes.sort((a, b) =>
              b.updatedAt > a.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0
            )
          );
        }
      } else if (sortBy === "created") {
        if (sortOrder === "asc") {
          setNotes(
            notes.sort((a, b) =>
              a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
            )
          );
        } else if (sortOrder === "desc") {
          setNotes(
            notes.sort((a, b) =>
              b.createdAt > a.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
            )
          );
        }
      }
    }
  };

  return (
    <NoteLayout.Provider value={{ current: layout, updateLayout: setLayout }}>
      <SortContext.Provider value={{ current: sort, update: setSort }}>
        <SortByContext.Provider
          value={{ current: sortBy, updateBy: setSortBy }}
        >
          <SortOrderContext.Provider
            value={{ current: sortOrder, updateOrder: setSortOrder }}
          >
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

              {displayGrid && <GridMap notes={notes} />}
              {displayList && <ListMap notes={notes} />}

              <Grid item xs={2} sm={4} md={4}></Grid>
            </Grid>
          </SortOrderContext.Provider>
        </SortByContext.Provider>
      </SortContext.Provider>
    </NoteLayout.Provider>
  );
};

export default NoteLayoutChange;
