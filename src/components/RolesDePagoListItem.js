const RolesDePagoListItem = (props) => {
  return (
    <li>
      {props.nombreEmpleado ? <p>{props.nombreEmpleado}</p> : null}
      <p>Desde: {props.desde}</p>
      <p>Hasta: {props.hasta}</p>
      <div>
        <p>Total ingresos: {props.ingresosTotal}</p>
      </div>
      <div>
        <p>Total egresos: {props.egresosTotal}</p>
      </div>
      <p>Neto a pagar: {props.neto}</p>
      <hr />
    </li>
  );
};

export default RolesDePagoListItem;
