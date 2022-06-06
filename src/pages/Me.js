import { useState, useContext, useEffect } from "react";
import RolesDePagoList from "../components/RolesDePagoList";
import RolesDePagoListItem from "../components/RolesDePagoListItem";
import AppContext from "../context/app-context";

const Me = () => {
  const ctx = useContext(AppContext);
  const [rolesPagoItems, setRolesPagoItems] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/roles-pago/${ctx.userInfo.id}`, {
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
            />
          );
        });
        setRolesPagoItems(rolesPagosItemsComponents);
      })
    );
  }, []);

  return (
    <div>
      <RolesDePagoList>{rolesPagoItems}</RolesDePagoList>
    </div>
  );
};

export default Me;
