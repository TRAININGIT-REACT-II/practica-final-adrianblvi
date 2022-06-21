import { createContext } from "react";

const NameContext = createContext({
  name: "",
  updateName: () => {},
});

export default NameContext;
