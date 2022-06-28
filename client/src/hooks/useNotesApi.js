import React, { useState, useEffect } from "react";
import AuthService from "../services/authService";

const useNotesApi = (noteParams = {}, performOnMount = true) => {
  const url = "api/notes";
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(performOnMount);

  const fetchNotes = () => {
    fetch(url, {
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

  const deleteNote = (idNote) => {};
};

export default useNotesApi;
