import { createContext } from "react";

const UserContext = createContext({
    signedIn: false,
    name: '',

    updateUser : () => {},
});


export default UserContext;