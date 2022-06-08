import { createContext } from "react";
import {THEMES} from "../constants/themes";

const Theme = createContext({
    currentTheme: THEMES.light,

    update : () => {},
});


export default Theme;