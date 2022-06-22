import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// Vistas importadas
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import NotFound from "./components/NotFound";
import NoteLayoutChange from "./components/Note/NoteLayout";
import NewNote from "./components/Note/NewNote";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar/NavBar";
import UserContext from "./contexts/userContext";

// Componente principal de la aplicación.
const App = () => {
  const sessionActive = localStorage.getItem("user") === null ? false : true;

  const [signedIn, setSignedIn] = useState(sessionActive);

  // Mostramos la aplicación

  return (
    <main>
      <UserContext.Provider
        value={{ signedIn: signedIn, updateUser: setSignedIn }}
      >
        <Router>
          <NavBar />
          <Switch>
            <PrivateRoute path="/" exact>
              <NoteLayoutChange />
            </PrivateRoute>
            <Route path="/new">
              <NewNote />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </main>
  );
};

export default App;
