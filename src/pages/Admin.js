import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

import { useState, useContext, useEffect } from "react";
import RolesDePagoList from "../components/RolesDePagoList";
import RolesDePagoListItem from "../components/RolesDePagoListItem";
import AppContext from "../context/app-context";

// inicialmente esta pag muestra todos los roles de pago con paginación

// al hacer click en el botón, se abre el menú para agregar el nuevo rol de pago

const Admin = () => {
  const history = useHistory();
  const addRolPagoHandler = () => {
    history.push("/roles-pago/admin/add");
  };

  const ctx = useContext(AppContext);

  const [rolesPagoItems, setRolesPagoItems] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/roles-pago/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: ctx.userInfo.token,
      },
    }).then((raw) =>
      raw.json().then(({ data: rolesPago }) => {
        console.log(rolesPago);
        const rolesPagosItemsComponents = rolesPago.map((rolPago) => {
          return (
            <RolesDePagoListItem
              key={rolPago.idRolDePago}
              desde={rolPago.desde}
              hasta={rolPago.hasta}
              ingresosTotal={rolPago.ingresos.total}
              egresosTotal={rolPago.egresos.total}
              neto={rolPago.netoAPagar}
              nombreEmpleado={rolPago.nombreEmpleado}
            />
          );
        });
        setRolesPagoItems(rolesPagosItemsComponents);
      })
    );
  }, []);

  return (
    <div>
      <p>Lista de todos los roles de pago</p>
      <button onClick={addRolPagoHandler}>Añadir Rol de Pago</button>
      <Route path="/roles-pago/add">
        <form>Add Rol de pago Form</form>
      </Route>
      <RolesDePagoList>{rolesPagoItems}</RolesDePagoList>
    </div>
  );
};
export default Admin;
