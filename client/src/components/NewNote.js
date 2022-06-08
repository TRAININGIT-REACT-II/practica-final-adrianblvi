import React from "react";
import "../../static/css/note.css";

const NewNote = () => {
  const match = useRouteMatch();

  const handleColorChange = () => {
    console.log("Color changed");
  };

  const handleNoteAdd = () => {
    console.log("Note added");
  };

  return (
    <div className="note-editor">
      <input
        type="text"
        placeholder="Enter the title here..."
        className="titulo"
      />
      <hr />
      <textarea
        placeholder="Enter your note here..."
        rows={5}
        className="textarea"
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
