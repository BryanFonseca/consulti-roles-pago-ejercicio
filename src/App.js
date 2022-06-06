import "./App.css";

import { useContext } from "react";
import AppContext from "./context/app-context";
import { Switch } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Me from "./pages/Me";
import Layout from "./components/Layout";

function App() {
  const { userInfo, isLoggedIn } = useContext(AppContext);
  return (
    <Switch>
      <Route path="/" exact>
        {/* if not logged in, go to the login page */}
      </Route>
      <Route path="/login">
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Redirect to="/roles-pago" />}
      </Route>
      <Layout>
        <Route path="/roles-pago">
          {userInfo.isAdmin ? (
            <Redirect to="/roles-pago/admin" />
          ) : (
            <Redirect to="/roles-pago/me" />
          )}
        </Route>
        <Route path="/roles-pago/me">
          <Me />
        </Route>
        <Route path="/roles-pago/admin">
          <Admin />
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
