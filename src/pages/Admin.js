import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

import { useState, useContext, useEffect, useRef } from "react";
import RolesDePagoList from "../components/RolesDePagoList";
import RolesDePagoListItem from "../components/RolesDePagoListItem";
import AppContext from "../context/app-context";
import classes from "./Admin.module.css";

import BasicInfoForm from "../components/BasicInfoForm";
import ConceptosForm from "../components/ConceptosForm";

const Admin = () => {
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const [isShownConceptosForm, setIsShownConceptosForm] = useState(true);
  const addRolPagoHandler = () => {
    setIsShownConceptosForm((prev) => !prev);
    if (isShownConceptosForm) {
      setShowForm(true);
      history.replace("/roles-pago/admin/add");
      return;
    }
    setShowForm(false);
    history.replace("/roles-pago/admin");
  };

  const ctx = useContext(AppContext);

  const [rolesPagoItems, setRolesPagoItems] = useState(null);

  const updateRolesPago = () => {
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
        setRolesPagoItems(
          rolesPago.reverse().map((rolPago) => {
            return {
              id: rolPago.idRolDePago,
              desde: rolPago.desde,
              hasta: rolPago.hasta,
              ingresosTotal: rolPago.ingresos.total,
              egresosTotal: rolPago.egresos.total,
              neto: rolPago.netoAPagar,
              nombreEmpleado: rolPago.nombreEmpleado,
            };
          })
        );
      })
    );
  };

  useEffect(updateRolesPago, []);

  const [empleados, setEmpleados] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/empleados/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: ctx.userInfo.token,
      },
    })
      .then((raw) => raw.json())
      .then((data) => {
        setEmpleados([...data]);
        console.log(data);
      });
  }, []);

  const onAddRolPagoHandler = (empleadoId, desde, hasta) => {
    const dataToSend = {
      empleadoId: empleadoId,
      desde: desde,
      hasta: hasta,
      conceptos: [...conceptos],
    };
    fetch("http://localhost:8080/roles-pago/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: ctx.userInfo.token,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((raw) => raw.json())
      .then((data) => {
        updateRolesPago();
      });
  };

  const [conceptos, setConceptos] = useState([]);

  const addConcepto = (nombre, tipo, valor) => {
    setConceptos((prev) => [
      {
        nombre: nombre,
        tipo: tipo,
        valor: valor,
      },
      ...prev,
    ]);
  };

  const cancelRef = useRef();

  return (
    <div>
      <button
        ref={cancelRef}
        className={classes.cancelButton}
        onClick={addRolPagoHandler}
      >
        {showForm ? "Cancelar" : "Añadir Rol de Pago"}
      </button>
      <Route path="/roles-pago/admin/add">
        <div className={classes.routeContainer}>
          <div className={classes.formsContainer}>
            <BasicInfoForm
              onAddRolPago={onAddRolPagoHandler}
              empleados={empleados}
              cancelButton={cancelRef.current}
            />
            <ConceptosForm onAddConcepto={addConcepto} />
          </div>
          <div className={classes.conceptosContainer}>
            <p>Conceptos:</p>
            <ul>
              {conceptos.map((concepto) => (
                <li
                  key={concepto.nombre}
                >{`${concepto.nombre} ${concepto.tipo} ${concepto.valor}`}</li>
              ))}
            </ul>
          </div>
        </div>
      </Route>
      {!showForm && (
        <div className={classes.rolesPagoContainer}>
          <h2>Roles de Pago:</h2>
          <RolesDePagoList>
            {rolesPagoItems &&
              rolesPagoItems.map((rolPago) => {
                return (
                  <RolesDePagoListItem
                    key={rolPago.id}
                    desde={rolPago.desde}
                    hasta={rolPago.hasta}
                    ingresosTotal={rolPago.ingresosTotal}
                    egresosTotal={rolPago.egresosTotal}
                    neto={rolPago.neto}
                    nombreEmpleado={rolPago.nombreEmpleado}
                  />
                );
              })}
          </RolesDePagoList>
        </div>
      )}
    </div>
  );
};
export default Admin;
