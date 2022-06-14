import React, {useState} from "react";
import { Alert, Box, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SesionAlert = (props) => {

    const [open, setOpen] = useState(true);
    return(
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              variant="outlined"
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {props.msg}
            </Alert>
          </Collapse>
        </Box>
    );
}


export default SesionAlert;