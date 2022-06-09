import { useState, useContext, useEffect } from "react";
import RolesDePagoList from "../components/RolesDePagoList";
import RolesDePagoListItem from "../components/RolesDePagoListItem";
import AppContext from "../context/app-context";
import useHttp from "../hooks/useHttp";

const Me = () => {
  const ctx = useContext(AppContext);
  const [rolesPagoItems, setRolesPagoItems] = useState(null);

  const { isLoading, sendRequest, requestError } = useHttp();
  useEffect(() => {
    sendRequest(
      {
        method: "GET",
        url: `http://localhost:8080/roles-pago/${ctx.userInfo.id}`,
        Authorization: ctx.userInfo.token,
      },
      ({ data: rolesPago }) => {
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
      }
    );
  }, []);

  return (
    <div>
      {isLoading ? <div>Cargando...</div> : null}
      <RolesDePagoList>{rolesPagoItems}</RolesDePagoList>
    </div>
  );
};

export default Me;
