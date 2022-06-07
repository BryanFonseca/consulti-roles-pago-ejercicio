import classes from "./RolesDePagoListItem.module.css";

const RolesDePagoListItem = (props) => {
  return (
    <li className={classes.item}>
      {props.nombreEmpleado ? (
        <p className={classes.nombre}>{props.nombreEmpleado}</p>
      ) : null}
      <div className={classes.fechasContainer}>
        <p>Desde: {props.desde}</p>
        <p>Hasta: {props.hasta}</p>
      </div>
      <div className={classes.totalesContainer}>
        <p>Total ingresos: {props.ingresosTotal}</p>
        <p>Total egresos: {props.egresosTotal}</p>
      </div>
      <p>Neto a pagar: {props.neto}</p>
    </li>
  );
};

export default RolesDePagoListItem;
