import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

import { useState, useContext, useEffect, useRef } from "react";
import RolesDePagoList from "../components/RolesDePagoList";
import RolesDePagoListItem from "../components/RolesDePagoListItem";
import AppContext from "../context/app-context";

const Admin = () => {
  const history = useHistory();
  const [isShownConceptosForm, setIsShownConceptosForm] = useState(true);
  const addRolPagoHandler = () => {
    setIsShownConceptosForm((prev) => !prev);
    if (isShownConceptosForm) {
      history.replace("/roles-pago/admin/add");
      return;
    }
    history.replace("/roles-pago/admin");
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
    })
      .then((raw) => raw.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <p>Lista de todos los roles de pago</p>
      <button onClick={addRolPagoHandler}>Añadir Rol de Pago</button>
      <Route path="/roles-pago/admin/add">
        <form onSubmit={onAddRolPagoHandler}>
          <label htmlFor="desde">Desde</label>
          <input ref={desdeRef} id="desde" type="month" />
          <label htmlFor="hasta">Hasta</label>
          <input ref={hastaRef} id="hasta" type="month" />

          <select ref={empleadoIdRef}>
            {empleados &&
              empleados.map((empleado) => (
                <option
                  key={empleado.idEmpleado}
                  value={empleado.idEmpleado}
                >{`${empleado.primerNombre} ${empleado.primerApellido}`}</option>
              ))}
          </select>
          <button>Añadir Rol de Pago</button>
        </form>
        <p>Conceptos:</p>
        <form onSubmit={onAddConceptoHandler}>
          <label htmlFor="nombre-concepto">Nombre</label>
          <input ref={nombreConceptoRef} id="nombre-concepto" type="text" />
          <select ref={tipoConceptoRef} name="select">
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
          <label htmlFor="valor-concepto">Valor</label>
          <input ref={valorConceptoRef} id="valor-concepto" type="number" />
          <button>Agregar Concepto</button>
        </form>
        <hr />
      </Route>
      <RolesDePagoList>{rolesPagoItems}</RolesDePagoList>
    </div>
  );
};
export default Admin;
