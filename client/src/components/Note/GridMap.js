import Grid from "@mui/material/Grid";
import CardNote from "./CardNote";

const GridMap = ({ notes, onClick }) => {
  return (
    <>
      {notes.map((note, i) => (
        <Grid item xs={2} sm={4} md={4} key={i}>
          <CardNote note={note} onClick={onClick} />
        </Grid>
      ))}
    </>
  );
};

export default GridMap;
