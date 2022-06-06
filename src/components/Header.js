import { NavLink, useHistory } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/app-context";

const Header = () => {
  const { userInfo, setIsLoggedIn } = useContext(AppContext);
  const history = useHistory();

  const onCerrarSesionHandler = () => {
    setIsLoggedIn(false);
    history.replace("/login");
  };

  return (
    <header>
      <nav>
        <ul>
          {/* No mostrar esta si el usuario no es admin */}
          {userInfo.isAdmin && (
            <li>
              <NavLink to="/roles-pago/admin">Admin Panel</NavLink>
            </li>
          )}

          <li>
            <NavLink to="/roles-pago/me">Mis Roles de Pago</NavLink>
          </li>
        </ul>
      </nav>
      <button onClick={onCerrarSesionHandler}>Cerrar sesión</button>
    </header>
  );
};

export default Header;
