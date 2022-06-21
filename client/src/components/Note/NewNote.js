import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { NOTE_STATE } from "../../constants/noteState";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AuthService from "../../services/authService";
import "../../../static/css/note.css";

const NewNote = () => {
  // const match = useRouteMatch();
  // const history = useHistory();

  const [note, setNote] = useState(NOTE_STATE);

  const handleColorChange = (e) => {
    console.log(e.target.value);
    setNote({ ...note, color: e.target.value });
  };

  const onChange = (key) => {
    return (e) =>
      setNote({
        ...note,
        [key]: e.target.value,
      });
  };

  const onClick = () => {
    history.back();
  };

  const handleNoteAdd = () => {
    fetch("/api/notes", {
      method: "POST",

      body: JSON.stringify({
        title: note.title,
        content: note.content,
      }),
      // Modificamos la cabecera
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-token": AuthService.getCurrentUser(),
      },
    })
      // Obtenemos la respuesta
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        history.push("/notes");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="note-editor">
      <div className="note-header">
        <h4>
          <ArrowBackIosIcon onClick={onClick} />
        </h4>

        <input
          type="text"
          className="titulo"
          placeholder="Enter your title here"
          value={note.title}
          onChange={onChange("title")}
        />
      </div>
      <hr />
      <textarea
        placeholder="Enter your note here..."
        rows={5}
        className="textarea"
        required={true}
        value={note.content}
        onChange={onChange("content")}
      />

      <div className="color-picker" onChange={handleColorChange}>
        <input type="radio" name="color-pick" value="#F06292" id="color1" />
        <label htmlFor="color1" style={{ backgroundColor: "#F06292" }}></label>
        <input type="radio" name="color-pick" value="#BA68C8" id="color2" />
        <label htmlFor="color2" style={{ backgroundColor: "#BA68C8" }}></label>
        <input type="radio" name="color-pick" value="#FFD54F" id="color3" />
        <label htmlFor="color3" style={{ backgroundColor: "#FFD54F" }}></label>
        <input type="radio" name="color-pick" value="#4FC3F7" id="color4" />
        <label htmlFor="color4" style={{ backgroundColor: "#4FC3F7" }}></label>
        <input type="radio" name="color-pick" value="#AED581" id="color5" />
        <label htmlFor="color5" style={{ backgroundColor: "#AED581" }}></label>
      </div>
      <button className="add-button" onClick={handleNoteAdd}>
        Añadir
      </button>
    </div>
  );
};

export default NewNote;
