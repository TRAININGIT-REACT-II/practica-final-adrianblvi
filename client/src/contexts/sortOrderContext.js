import { createContext } from "react";

const SortOrderContext = createContext({
  sortOrder: "",
  updateOrder: () => {
    console.log(
      "SortOrderContext: updateOrder() called with sortOrder=" + sortOrder
    );
  },
});

export default SortOrderContext;
