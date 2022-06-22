import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "../../../static/css/note.css";

const CardNote = () => {
  const [showDetails, setShowDetails] = useState(false);
  const title = "Titulo";
  const details =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const detailsSliced = details.slice(0, 200) + "  ...";
  const detailsToShow = showDetails ? details : detailsSliced;

  const onClick = () => {
    console.log("onClick");
    console.log(showDetails);
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <Card elevation={0}>
        <CardHeader
          action={
            <div>
              <IconButton onClick={() => console.log("Editing Note")}>
                <CreateOutlinedIcon />
              </IconButton>

              <IconButton onClick={() => console.log("Delete Note")}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </div>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardContent>
          <div onClick={onClick}>
            <Typography variant="body2" color="textSecondary">
              {detailsToShow}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardNote;
