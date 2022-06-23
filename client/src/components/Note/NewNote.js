import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { NOTE_STATE } from "../../constants/noteState";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AuthService from "../../services/authService";
import "../../../static/css/note.css";

const NewNote = () => {
  // const match = useRouteMatch();
  let history = useHistory();

  const [note, setNote] = useState(NOTE_STATE);
  const style = {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  };

  const onChange = (key) => {
    return (e) =>
      setNote({
        ...note,
        [key]: e.target.value,
      });
  };

  const onClick = () => {
    history.goBack();
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
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={style}>
      <div className="note-editor">
        <div className="note-header">
          <input
            type="text"
            className="titulo"
            placeholder="Enter your title here"
            value={note.title}
            onChange={onChange("title")}
          />
          <CloseOutlinedIcon onClick={onClick} fontSize="small" />
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

        <button className="add-button" onClick={handleNoteAdd}>
          Añadir
        </button>
      </div>
    </div>
  );
};

export default NewNote;
