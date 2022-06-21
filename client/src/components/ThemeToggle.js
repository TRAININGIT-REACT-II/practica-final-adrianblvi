import { useContext } from "react";
import { THEMES } from "../constants/themes";
import Theme from "../contexts/theme";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const ThemeToggle = () => {
  const theme = useContext(Theme);
  const currentName =
    theme.current === THEMES.dark ? "Tema claro" : "Tema oscuro";

  const onClick = () => {
    console.log("onClick");
    if (theme.current === THEMES.light) {
      theme.update(THEMES.dark);
    } else {
      theme.update(THEMES.light);
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckChecked"
        onClick={onClick}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
        {currentName}
      </label>
    </div>
  );
};

export default ThemeToggle;
