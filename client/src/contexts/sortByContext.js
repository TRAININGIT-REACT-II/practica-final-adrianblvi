import { createContext } from "react";

const SortByContext = createContext({
  sortBy: "",
  updateBy: () => {
    console.log("SortContext: update called ");
    console.log(this.props.sortBy);
  },
});

export default SortByContext;
