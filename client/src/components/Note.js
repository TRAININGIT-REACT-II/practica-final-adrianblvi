import React from "react";
import "../../static/css/note.css";

const Note = () => {
  var style = { backgroundColor: this.props.color };
  return (
    <div className="note" style={style}>
      <span className="delete-note">
        {" "}
        ×{" "}
      </span>
      {this.props.children}
    </div>
  );
};


export default Note;