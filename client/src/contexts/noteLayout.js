import {NOTES_LAYOUT} from "./notesLayout";
import { createContext } from "react";

const NoteLayout = createContext({
    current : NOTES_LAYOUT.list,

    update : () => {},
});

export default NoteLayout;