import React, { useContext } from "react";
import UserContext from "../contexts/userContext";
import { BrowserRouter as Link } from "react-router-dom";

const NavBar = () => {
  const { signedIn, name } = useContext(UserContext);
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
            TRAINING NOTES
        </Link>
    </nav>    
  );
};

export default NavBar;
