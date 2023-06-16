import PropTypes from "prop-types";
import react, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Container from "../../../../../Components/Layouts/Container/Container";
import Footer from "../../../../../Components/Layouts/Footers/Footer";
import "../StyleCronograma/AgregarCronograma.css";

import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import MensajeErrorInput from "../../../../../Components/Layouts/Alertas/MensajeErrorInput";
import Select from "react-select";
import { mostrarPunto } from "../../../../../Redux/Actions/puntos.action";
const AgregarCronograma = ({ mostrarPunto, punto: { puntos, loading } }) => {
  useEffect(() => {
    mostrarPunto();
  }, []);

  const fechaActual = new Date();
  const anio = fechaActual.getFullYear();
  const mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  const dia = ("0" + fechaActual.getDate()).slice(-2);

  const [inputFecha, setInputFecha] = useState(`${anio}-${mes}-${dia}`);
  const [tituloFecha, setTituloFecha] = useState("Fecha...");
/* 
  useEffect(() => {
    if (inputFecha) {
     
      
      let fecha = new Date(inputFecha);
      let fechaDiaText = fecha.toLocaleDateString("es-ES", {weekday: "long"})

      let fechaDiaNro = fecha.toLocaleDateString("es-ES", {day:"numeric"})

      let fechaMes = fecha.toLocaleDateString("es-ES", {year:"numeric", month:"short"})

      let fechaText = `${fechaDiaText}, ${parseInt(fechaDiaNro) + 1} de ${fechaMes}`
  
      const palabras = fechaText.split(" ");
      for (let i = 0; i < palabras.length; i++) {
        palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substring(1);
      }
      const fechaMayusculas = palabras.join(" ");
      setTituloFecha(fechaMayusculas)
    }
  }, [inputFecha]); */

  const handleAdd = async (values) => {
    const formData = new FormData();

    console.log(values);
  };

  const formikRef = useRef();
  const schemaFormCronograma = yup.object().shape({
    fecha: yup.date().required("La Fecha Es Requerida"),
    /*     nombreConsorcio: yup.string().required("Falta El Nombre Del Consorcio") */
  });

  const [optionsArray, setOptionsArray] = useState([]);

  useEffect(() => {
    let arrayNewOptions = [];
    let option;
    if (puntos.length > 0) {
      for (var i = 0; i < puntos.length; i++) {
        if (
          puntos[i].tipo == "PuntoFijo" ||
          puntos[i].tipo == "PuntoBarrio" ||
          puntos[i].tipo == "PuntoInterior"
        ) {
          if (
            puntos[i].tipo == "PuntoBarrio" ||
            puntos[i].tipo == "PuntoInterior"
          ) {
            option = {
              value: `${puntos[i]?.uid}`,
              label: `📌 ${puntos[i]?.barrio}`,
            };
          } else {
            option = {
              value: `${puntos[i]?.uid}`,
              label: `📌 ${puntos[i]?.nombre}`,
            };
          }
          arrayNewOptions.push(option);
        }
      }
      setOptionsArray(arrayNewOptions);
    }
  }, [puntos]);

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card shadow">
              <div className="card-body">
                <div class="containerAgregarCronograma">

                  
                  <div class="cardAC">
                    <div class="card__headerAC">
                      <img
                        src="https://res.cloudinary.com/dabtnpikz/image/upload/v1684160826/vkxhom3b3sbzhvvg5ba7.webp"
                        alt="card__image"
                        class="card__imageAC"
                        width="600"
                      />
                    </div>
                    <div class="card__bodyAC">
                      <span class="tagAC tag-red">{inputFecha}</span>
                      <h5>{tituloFecha}</h5>
                      <Formik
                        enableReinitialize={true}
                        innerRef={formikRef}
                        initialValues={{
                          fecha: inputFecha,
                          puntoNombre: "",
                          nombreConsorcio: "",
                        }}
                        onSubmit={handleAdd}
                        validationSchema={schemaFormCronograma}
                      >
                        {({ isSubmitting, dirty }) => (
                          <Form id="formAuthentication" className="form-group">
                            <div /* className="row justify-content-around" */>
                              <div class="mb-3">
                                <label className="form-label">Punto</label>
                                <div className="content-inputs">
                                  <Select
                                    isMulti
                                    name="puntoNombre"
                                    options={optionsArray}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="Seleccionar puntos..."
                                  />
                                  <MensajeErrorInput
                                    name="puntoNombre"
                                    className="alert alert-danger"
                                  />
                                </div>
                              </div>

                              <div class="mb-3">
                                <label className="form-label">Fecha</label>
                                <div className="content-inputs">
                                  <Field
                                    type="date"
                                    className="form-control"
                                    name="fecha"
                                    placeholder="Por favor ingrese la fecha"
                                    onChange={(e) => {
                                      setInputFecha(e.target.value);
                                    }}
                                  />
                                  <MensajeErrorInput
                                    name="fecha"
                                    className="alert alert-danger"
                                  />
                                </div>
                              </div>

                              <div class="mb-3">
                                <label className="form-label">
                                  Nombre Consorcio
                                </label>
                                <div className="content-inputs">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name="nombreConsorcio"
                                    placeholder="Por favor ingrese la fecha"
                                  />
                                  <MensajeErrorInput
                                    name="nombreConsorcio"
                                    className="alert alert-danger"
                                  />
                                </div>
                              </div>
                            </div>

                            <div align="center">
                              <button type="submit" className="btn btn-info">
                                Guardar Cronograma
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Container>
  );
};

AgregarCronograma.propTypes = {
  mostrarPunto: PropTypes.func.isRequired,
  puntos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  punto: state.puntosReducer,
});

export default connect(mapStateToProps, { mostrarPunto })(AgregarCronograma);
