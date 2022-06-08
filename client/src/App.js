import { useEffect, useState } from "react";
import Theme from "./contexts/theme";
import { THEMES } from "./constants/themes";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// Vistas importadas
import ThemeToggle from "./components/ThemeToggle";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notes from "./components/NewNote";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";

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
              <h1>TRAINNING NOTES</h1>
              <ThemeToggle />
              <button className="btn btn-secondary">
                {" "}
                <Link to="/notes"> Ver notas</Link>{" "}
              </button>
              <p>
                <Link to="/login">Iniciar sesión</Link>
              </p>
              <p>
                <Link to="/signup">Registarse</Link>
              </p>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
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
