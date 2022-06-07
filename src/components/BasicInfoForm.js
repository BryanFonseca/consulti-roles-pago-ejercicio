import { useHistory } from "react-router-dom";
import { useFormik, yupToFormErrors } from "formik";
import classes from "./BasicInfoForm.module.css";
import * as Yup from "yup";

const BasicInfoForm = (props) => {
  const formik = useFormik({
    initialValues: {
      desde: "2022-07",
      hasta: "2022-08",
      empleado: 1,
    },
    validationSchema: Yup.object({
      desde: Yup.string().required("Campo requerido."),
      hasta: Yup.string().required("Campo requerido."),
    }),
    onSubmit: onAddBasicInfo,
  });

  const history = useHistory();

  function onAddBasicInfo(values) {
    props.onAddRolPago(values.empleado, values.desde, values.hasta);
    props.cancelButton.click();
  }

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="empleado">Empleado</label>
        <select id="empleado" name="empleado" onChange={formik.handleChange}>
          {props.empleados &&
            props.empleados.map((empleado) => (
              <option
                key={empleado.idEmpleado}
                value={empleado.idEmpleado}
              >{`${empleado.primerNombre} ${empleado.primerApellido}`}</option>
            ))}
        </select>
      </div>
      <div>
        <div>
          <label htmlFor="desde">Desde</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id="desde"
            type="month"
          />
          {formik.touched.desde && formik.errors.desde ? (
            <div className="validation-error">{formik.errors.desde} </div>
          ) : null}
        </div>
        <div>
          <label htmlFor="hasta">Hasta</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id="hasta"
            type="month"
          />
          {formik.touched.hasta && formik.errors.hasta ? (
            <div className="validation-error">{formik.errors.hasta} </div>
          ) : null}
        </div>
      </div>
      <button type="submit">Añadir</button>
    </form>
  );
};

export default BasicInfoForm;
