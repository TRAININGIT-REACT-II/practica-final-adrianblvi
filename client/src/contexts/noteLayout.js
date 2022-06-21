import {NOTES_LAYOUT} from "../constants/notesLayout";
import { createContext } from "react";

const NoteLayout = createContext({
    current : NOTES_LAYOUT.card,

    update : () => {},
});

export default NoteLayout;