import classes from "./RolesDePagoListItem.module.css";

const formatMoney = (number) => {
  const fixed = parseFloat(number).toFixed(2);
  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fixed);
  return money;
};

const formatDate = (dateString) => {
  const parsed = new Date(dateString);
  const year = parsed.getFullYear();
  const month = parsed.getMonth().toString().padStart(2, "0");
  return `${month}/${year}`;
};

const RolesDePagoListItem = (props) => {
  return (
    <li className={classes.item}>
      {props.nombreEmpleado ? (
        <p className={classes.nombre}>{props.nombreEmpleado}</p>
      ) : null}
      <div className={classes.fechasContainer}>
        <p>Desde: {formatDate(props.desde)}</p>
        <p>Hasta: {formatDate(props.hasta)}</p>
      </div>
      <div className={classes.totalesContainer}>
        <p>Total ingresos: {formatMoney(props.ingresosTotal)}</p>
        <p>Total egresos: {formatMoney(props.egresosTotal)}</p>
      </div>
      <p>Neto a pagar: {formatMoney(props.neto)}</p>
    </li>
  );
};

export default RolesDePagoListItem;
