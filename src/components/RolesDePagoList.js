import classes from "./RolesDePagoList.module.css";

const RolesDePagoList = (props) => {
  return <ul className={classes.rolesContainer}>{props.children}</ul>;
};

export default RolesDePagoList;
