import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/app-context";

const Header = () => {
  const { userInfo } = useContext(AppContext);
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
    </header>
  );
};

export default Header;
