import * as yup from "yup";
import { Field, Form, Formik } from "formik";

import PropTypes from "prop-types";
import react, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import { Link } from "react-router-dom";
import "./StylesAsistencias/AgregarConvocados.css";
import { mostrarPunto } from "../../../../Redux/Actions/puntos.action";
import Spinner from "../../../../Components/Layouts/Spinners/Spinner";
import MensajeErrorInput from "../../../../Components/Layouts/Alertas/MensajeErrorInput";

const AgregarConvocados = ({ mostrarPunto, punto: { puntos } }) => {
  useEffect(() => {
    mostrarPunto();
  }, []);

  const [inputFecha, setInputFecha] = useState();
  const [inputPuntoSeleccionado, setInputSeleccionado] = useState(null);
  const [listaConvocados, setListaConvocados] = useState([]);
  const [cantidadList, setCantidadList] = useState([
    { nombreCompleto: "", funcion: "" },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...cantidadList];
    list[index][name] = value;
    setCantidadList(list);
  };

  const handleDelete = (index) => {
    const list = [...cantidadList];
    list.splice(index, 1);
    setCantidadList(list);
  };

  const handleAdd = () => {
    setCantidadList([...cantidadList, { nombreCompleto: "", funcion: "" }]);
  };

  const seleccionarPunto = (item) => {
    if(item == inputPuntoSeleccionado) {
       setInputSeleccionado(null);
    }else{
      setInputSeleccionado(item);
    }
  }

  const agregarNuevoConvocado = () => {
    setListaConvocados([
      ...listaConvocados,
      {
        fecha: inputFecha,
        punto: inputPuntoSeleccionado,
        lista: cantidadList
      },
    ]);
  };

  console.log(listaConvocados);

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card shadow">
              <div class="card-body">
                <div align="center">
                  <h4 className="card-title">NUEVA LISTA DE CONVOCADOS</h4>
                  <input
                    type="Date"
                    className="form-control inputConvocados"
                    onChange={(e) => {
                      setInputFecha(e.target.value);
                    }}
                  />
                  <hr />
                  {puntos.length > 0 ? (
                    <div className="row py-2">
                      {puntos?.map((item) => {
                        if (
                          item?.tipo == "PuntoFijo" ||
                          item?.tipo == "PuntoBarrio" ||
                          item?.tipo == "PuntoInterior"
                        ) {
                          return (
                            <div className="col-md-4 mb-3">
                              {
                                inputPuntoSeleccionado == item?.uid ?
                                <button
                                type="button"
                                className="btn btn-success btn-icon-text"
                                onClick={() => {
                                  seleccionarPunto(item?.uid)
                                }}
                              >
                                <i className="ti-check"> </i>
                                {item?.tipo == "PuntoBarrio"
                                  ? item?.barrio
                                  : item?.tipo == "PuntoInterior"
                                  ? item?.departamento
                                  : item?.nombre}
                              </button>
                              :
                              <button
                                type="button"
                                className="btn btn-info btn-icon-text"
                                disabled={inputPuntoSeleccionado == null ? false : true}
                                onClick={() => {
                                  seleccionarPunto(item?.uid)
                                }}
                              >
                                <i className="ti-location-pin"> </i>
                                {item?.tipo == "PuntoBarrio"
                                  ? item?.barrio
                                  : item?.tipo == "PuntoInterior"
                                  ? item?.departamento
                                  : item?.nombre}
                              </button>

                              }
                              
                            </div>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    <div>
                      <Spinner />
                    </div>
                  )}

                  <hr />
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr align="center">
                          <th>#</th>
                          <th>Nombre y Apellido</th>
                          <th>Funciones</th>
                          <th>Convocado</th>
                        </tr>
                      </thead>
                      <>
                        {cantidadList.length > 0 ? (
                          <tbody>
                            {cantidadList.map((data, i) => {
                              const last = cantidadList.length-1
                              console.log('long> ', last, " indix ", i)
                              return (
                                <tr align="center">
                                  <td></td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control inputConvocados"
                                      name="nombreCompleto"
                                      value={data.nombreCompleto}
                                      placeholder="Nombre y Apellido"
                                      onChange={(e) => handleChange(e, i)}
                                    />
                                  </td>

                                  <td>
                                    <div className="content-select">
                                      <select
                                        className="form-select"
                                        name="funcion"
                                        onChange={(e) => handleChange(e, i)}
                                        value={data.funcion}
                                      >
                                        <option value="">
                                          Seleccionar Una Funcion:
                                        </option>
                                        <option value="coordinadora">
                                          Coordinador/a
                                        </option>
                                        <option value="caja">Caja</option>
                                        <option value="logistica">
                                          Logistica
                                        </option>
                                        <option value="comercializacion">
                                          Comercializacion
                                        </option>
                                      </select>
                                    </div>
                                  </td>

                                  <td>
                                    {
                                      last == i ?
                                      <button
                                      type="button"
                                      className="btn btn-inverse-success mx-2"
                                      onClick={() => {
                                        handleAdd();
                                      }}
                                    >
                                      <i className="ti-hand-point-down"></i> Otro
                                    </button>
                                    :
                                    null
                                    }
                                    <button
                                      type="button"
                                      className="btn btn-inverse-danger mx-2"
                                      onClick={() => {
                                        handleDelete(i);
                                      }}
                                    >
                                      <i className="ti-close"></i>
                                    </button>
                                    {/*   <button
                              type="button"
                              className="btn btn-inverse-danger "
                            >
                              <i className="ti-thumb-down"></i> Eliminar
                            </button> */}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        ) : null}
                      </>
                    </table>
                    {cantidadList.length > 0 ? 
                    <div align="center" className="py-4">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        agregarNuevoConvocado();
                      }}
                    >
                      Guardar Lista
                    </button>
                    </div>
                    : 
                      <div align="center" className="py-4">
                        <button
                          className="btn btn-inverse-success"
                          onClick={() => {
                            handleAdd();
                          }}
                        >
                          Agregar Convocados
                        </button>
                      </div>
                    }
                    {/* {partes_dias.length == 0 ? (
                      <div align="center" style={{marginTop: "20px"}}>
                        <h6>No hay Partes Del Dia Cargados</h6>
                      </div>
                    ) : null} */}
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

AgregarConvocados.propTypes = {
  mostrarPunto: PropTypes.func.isRequired,
  puntos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  punto: state.puntosReducer,
});

export default connect(mapStateToProps, {
  mostrarPunto,
})(AgregarConvocados);
