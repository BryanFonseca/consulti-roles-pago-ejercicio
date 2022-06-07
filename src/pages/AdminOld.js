import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

import { useState, useContext, useEffect, useRef } from "react";
import RolesDePagoList from "../components/RolesDePagoList";
import RolesDePagoListItem from "../components/RolesDePagoListItem";
import AppContext from "../context/app-context";
import classes from "./Admin.module.css";

const Admin = () => {
  const history = useHistory();
  const [isShownConceptosForm, setIsShownConceptosForm] = useState(true);
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
        const rolesPagosItemsComponents = rolesPago
          .slice(0)
          .reverse()
          .map((rolPago) => {
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

  const nombreConceptoRef = useRef();
  const tipoConceptoRef = useRef();
  const valorConceptoRef = useRef();
  const [conceptosLocales, setConceptos] = useState([]);
  const onAddConceptoHandler = (e) => {
    e.preventDefault();
    console.log(nombreConceptoRef.current.value);
    console.log(tipoConceptoRef.current.value);
    console.log(valorConceptoRef.current.value);
    setConceptos((prev) => [
      ...prev,
      {
        nombre: nombreConceptoRef.current.value,
        tipo: tipoConceptoRef.current.value,
        valor: +valorConceptoRef.current.value,
      },
    ]);
    setTimeout(() => {
      nombreConceptoRef.current.value = "";
      tipoConceptoRef.current.value = "ingreso";
      valorConceptoRef.current.value = "";
    });
  };

  const empleadoIdRef = useRef();
  const desdeRef = useRef();
  const hastaRef = useRef();
  const onAddRolPagoHandler = (e) => {
    e.preventDefault();
    const dataToSend = {
      empleadoId: +empleadoIdRef.current.value,
      desde: desdeRef.current.value + "-01",
      hasta: hastaRef.current.value + "-01",
      conceptos: [...conceptosLocales],
    };
    fetch("http://localhost:8080/roles-pago/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: ctx.userInfo.token,
      },
      body: JSON.stringify(dataToSend),
    }).then((raw) => raw.json());
  };

  return (
    <div>
      <button onClick={addRolPagoHandler}>Añadir Rol de Pago</button>
      <Route path="/roles-pago/admin/add">
        <form className={classes.basicContainer} onSubmit={onAddRolPagoHandler}>
          <div className={classes.fechasContainer}>
            <div>
              <label htmlFor="desde">Desde</label>
              <input ref={desdeRef} id="desde" type="month" />
            </div>
            <div>
              <label htmlFor="hasta">Hasta</label>
              <input ref={hastaRef} id="hasta" type="month" />
            </div>
          </div>
          <select ref={empleadoIdRef}>
            {empleados &&
              empleados.map((empleado) => (
                <option
                  key={empleado.idEmpleado}
                  value={empleado.idEmpleado}
                >{`${empleado.primerNombre} ${empleado.primerApellido}`}</option>
              ))}
          </select>
          <button>Añadir</button>
        </form>
        <h3 className={classes.conceptoTitle}>Conceptos:</h3>
        <form
          className={classes.conceptosContainer}
          onSubmit={onAddConceptoHandler}
        >
          <div>
            <label htmlFor="nombre-concepto">Nombre</label>
            <input ref={nombreConceptoRef} id="nombre-concepto" type="text" />
          </div>

          <div>
            <select ref={tipoConceptoRef} name="select">
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
            </select>
          </div>

          <div>
            <label htmlFor="valor-concepto">Valor</label>
            <input ref={valorConceptoRef} id="valor-concepto" type="number" />
          </div>
          <button>Agregar Concepto</button>
        </form>
        <ul>
          {conceptosLocales
            .slice(0)
            .reverse()
            .map((concepto) => (
              <li>{concepto.nombre}</li>
            ))}
        </ul>
      </Route>
      <div className={classes.rolesPagoContainer}>
        <h2>Roles de Pago:</h2>
        <RolesDePagoList>{rolesPagoItems}</RolesDePagoList>
      </div>
    </div>
  );
};
export default Admin;
