import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import CardNote from "./CardNote";

const GridMap = (props) => {
  useEffect(() => {
    console.log("GridMap", props.notes);
  });

  const data = [
    { name: "John Doe", age: 44 },
    { name: "Jas", age: 45 },
    { name: "asd", age: 44 },
    { name: "asdasd", age: 45 },
    { name: "czxczx", age: 44 },
    { name: "asdqewedq", age: 45 },
  ];

  return (
    <>
      {data.map((person) => (
        <Grid item xs={2} sm={4} md={4} key={person.name}>
          <CardNote />
        </Grid>
      ))}
    </>
  );
};

export default GridMap;
