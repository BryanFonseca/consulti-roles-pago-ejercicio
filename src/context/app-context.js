import { createContext, useEffect, useState } from "react";

// autocompletion help
const AppContext = createContext({});

export const AppContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState({
    isAdmin: null,
    cedula: null,
    nombres: null,
    token: null,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const changeUserInfo = (newUserInfo) => {
    setUserInfo({
      ...newUserInfo,
    });
  };

  useEffect(() => {
    // comprobar en local storage si hay datos de sesión
  });

  return (
    <AppContext.Provider
      value={{
        setUserInfo: changeUserInfo,
        userInfo,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
