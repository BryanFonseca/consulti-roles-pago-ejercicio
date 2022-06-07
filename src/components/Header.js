import { NavLink, useHistory } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/app-context";
import classes from "./Header.module.css";

const Header = () => {
  const { userInfo, setIsLoggedIn } = useContext(AppContext);
  const history = useHistory();

  const onCerrarSesionHandler = () => {
    setIsLoggedIn(false);
    history.replace("/login");
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.links}>
          {/* No mostrar esta si el usuario no es admin */}
          {userInfo.isAdmin && (
            <li>
              <NavLink
                activeClassName={classes.activeLink}
                to="/roles-pago/admin"
              >
                Admin Panel
              </NavLink>
            </li>
          )}

          <li>
            <NavLink activeClassName={classes.activeLink} to="/roles-pago/me">
              Mis Roles de Pago
            </NavLink>
          </li>
        </ul>
      </nav>
      <button className={classes.logoutButton} onClick={onCerrarSesionHandler}>
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;
