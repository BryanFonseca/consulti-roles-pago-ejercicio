const RolesDePagoListItem = (props) => {
  return (
    <li>
      {props.nombreEmpleado ? <p>{props.nombreEmpleado}</p> : null}
      <p>{props.desde}</p>
      <p>{props.hasta}</p>
      <div>
        <p>{props.ingresosTotal}</p>
      </div>
      <div>
        <p>{props.egresosTotal}</p>
      </div>
      <p>{props.neto}</p>
      <hr />
    </li>
  );
};

export default RolesDePagoListItem;
