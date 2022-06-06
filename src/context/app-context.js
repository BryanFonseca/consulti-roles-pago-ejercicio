import { createContext } from "react";

// autocompletion help
const AppContext = createContext({});

export const AppContextProvider = (props) => {
  return (
    <AppContext.Provider
      value={{
        userInfo: { isAdmin: true },
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
