import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import classes from "./ConceptosForm.module.css";

const ConceptosForm = (props) => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      tipo: "ingreso",
      valor: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Campo obligatorio."),
      valor: Yup.string().required("Campo obligatorio."),
    }),
    onSubmit: AddConcepto,
  });

  function AddConcepto({ nombre, tipo, valor }) {
    console.log(nombre, tipo, valor);
    props.onAddConcepto(nombre, tipo, +valor);
  }

  return (
    <>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="nombre"
            id="nombre"
            type="text"
          />
          {formik.touched.nombre && formik.errors.nombre ? (
            <div className="validation-error">{formik.errors.nombre} </div>
          ) : null}
        </div>

        <div>
          <label htmlFor="tipo">Tipo</label>
          <select onChange={formik.handleChange} name="tipo" id="tipo">
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
        </div>

        <div>
          <label htmlFor="valor">Valor</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="valor"
            id="valor"
            type="number"
          />
          {formik.touched.valor && formik.errors.valor ? (
            <div className="validation-error">{formik.errors.valor} </div>
          ) : null}
        </div>
        <button type="submit">Agregar Concepto</button>
      </form>
    </>
  );
};

export default ConceptosForm;
