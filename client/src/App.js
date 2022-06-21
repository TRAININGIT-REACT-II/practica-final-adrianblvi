import { useEffect, useState } from "react";
import Theme from "./contexts/theme";
import { THEMES } from "./constants/themes";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// Vistas importadas
import ThemeToggle from "./components/ThemeToggle";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import NotFound from "./components/NotFound";
import NotesList from "./components/Note/NotesList";
import NoteLayoutChange from "./components/Note/NoteLayout";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar/NavBar";

// Componente principal de la aplicación.
const App = () => {
  const [theme, setTheme] = useState(THEMES.light);

  // Mostramos la aplicación

  return (
    <main>
      <Router>
        <Theme.Provider value={{ current: theme, update: setTheme }}>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <NoteLayoutChange />
              <button className="btn btn-secondary">
                {" "}
                <Link to="/notes"> Ver notas</Link>{" "}
              </button>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <PrivateRoute path="/notes">
              <NotesList />
            </PrivateRoute>
            {/* <Route path="/notes">
              <NotesList />
            </Route> */}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Theme.Provider>
      </Router>
    </main>
  );
};

export default App;
