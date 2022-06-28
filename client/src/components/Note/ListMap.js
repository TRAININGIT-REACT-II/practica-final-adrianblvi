import React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CardNote from "./CardNote";

const ListMap = ({ notes }) => {
  return (
    <>
      <Grid item xs={2} sm={2} md={2}></Grid>
      <Grid item xs={2} sm={6} md={6}>
        <List>
          {notes.map((note, i) => (
            <ListItem xs={2} sm={4} md={4} key={i} sx={{ display: "block" }}>
              <CardNote note={note} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
};

export default ListMap;
