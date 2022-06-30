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
    console.log("Sorting state has changed...", sort);
  }, [sort]);

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

  const compareTitles = (a, b) => {
    if (sort.sortOrder === "up") {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    } else if (sort.sortOrder === "down") {
      if (a.title < b.title) {
        return 1;
      }
      if (a.title > b.title) {
        return -1;
      }
      return 0;
    }
  };

  const compareUpdatedDate = (a, b) => {
    if (sort.sortOrder === "up") {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    } else if (sort.sortOrder === "down") {
      if (a.title < b.title) {
        return 1;
      }
      if (a.title > b.title) {
        return -1;
      }
      return 0;
    }
  };

  const compareCreatedDate = (a, b) => {
    if (sort.sortOrder === "up") {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    } else if (sort.sortOrder === "down") {
      if (a.title < b.title) {
        return 1;
      }
      if (a.title > b.title) {
        return -1;
      }
      return 0;
    }
  };

  return (
    <NoteLayout.Provider value={{ current: layout, updateLayout: setLayout }}>
      <SortContext.Provider value={{ sort: sort, update: setSort }}>
        <SortByContext.Provider value={{ sort: sortBy, updateBy: setSortBy }}>
          <SortOrderContext.Provider
            value={{ sortOrder: sortOrder, updateOrder: setSortOrder }}
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
