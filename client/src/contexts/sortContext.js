import { createContext } from "react";

const SortContext = createContext({
  current: false,
  update: () => {},
});

export default SortContext;
