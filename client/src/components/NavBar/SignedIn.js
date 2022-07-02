import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import ThemeToggle from "../ThemeToggle";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserContext from "../../contexts/userContext";
import AuthService from "../../services/authService";

const SignedIn = () => {
  // const { name } = useContext(NameContext);

  const user = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const history = useHistory();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    user.updateUser(false);
    history.push("/login");
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <PersonIcon />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          {/* {name} */}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <ListItemIcon>
            <ThemeToggle fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SignedIn;
