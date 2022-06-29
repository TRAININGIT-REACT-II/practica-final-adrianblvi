import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { NOTE_STATE } from "../../constants/noteState";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AuthService from "../../services/authService";
import "../../../static/css/note.css";

const NewNote = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  const noteReceived =
    location.state === undefined ? undefined : location.state.note;

  const [note, setNote] = useState(NOTE_STATE);
  const [editing, setEditing] = useState(false);

  const buttonText = editing ? "Guardar" : "Añadir";

  const style = {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    if (noteReceived != undefined) {
      if (id === noteReceived.id) {
        setEditing(true);
        setNote(noteReceived);
      }
    }
  }, []);

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
    let url = "";
    let method = "";

    if (editing) {
      // seteamos url y method para realizar petición PUT
      url = "/api/notes/" + note.id;
      method = "PUT";
    } else {
      // seteamos url y method para realizar petición POST
      url = "/api/notes";
      method = "POST";
    }

    fetch(url, {
      method: method,

      body: JSON.stringify({
        title: note.title,
        content: note.content,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-token": AuthService.getCurrentUser(),
      },
    })
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

        <TextareaAutosize
          placeholder="Enter your note here..."
          minRows={8}
          className="textarea"
          required={true}
          value={note.content}
          onChange={onChange("content")}
        />
        <button className="add-button" onClick={handleNoteAdd}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default NewNote;
