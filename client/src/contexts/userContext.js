import { createContext } from "react";

const UserContext = createContext({
  signedIn: true,
  updateUser: () => {},
});

export default UserContext;
