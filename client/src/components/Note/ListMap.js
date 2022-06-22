import React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CardNote from "./CardNote";

const ListMap = (props) => {
  const data = [
    { name: "John Doe", age: 44 },
    { name: "Jas", age: 45 },
    { name: "asd", age: 44 },
    { name: "asdasd", age: 45 },
    { name: "czxczx", age: 44 },
    { name: "asdqewedq", age: 45 },
  ];

  const notesData = props.notes;

  return (
    <>
      <Grid item xs={2} sm={2} md={2}></Grid>
      <Grid item xs={2} sm={6} md={6}>
        <List>
          {data.map((person) => (
            <ListItem xs={2} sm={4} md={4} key={person.name}>
              <CardNote />
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
};

export default ListMap;
