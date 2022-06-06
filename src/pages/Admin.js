import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

// inicialmente esta pag muestra todos los roles de pago con paginación

// al hacer click en el botón, se abre el menú para agregar el nuevo rol de pago

const Admin = () => {
  const history = useHistory();
  const addRolPagoHandler = () => {
    history.push("/roles-pago/admin/add");
  };

  return (
    <div>
      <p>Lista de todos los roles de pago</p>
      <button onClick={addRolPagoHandler}>Añadir Rol de Pago</button>
      <Route path="/roles-pago/add">
        <form>Add Rol de pago Form</form>
      </Route>
    </div>
  );
};
export default Admin;
