import React, { useEffect, useState, useRef } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import "./Style Inventario/AgregarInventarioV2.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  crearInventario,
  limpiarInventario,
} from "../../../../Redux/Actions/inventario.action";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { mostrarPunto } from "../../../../Redux/Actions/puntos.action.js";
import { mostrarProductos } from "../../../../Redux/Actions/productos.action.js";
import { Link, Redirect, useHistory } from "react-router-dom";
import MensajeErrorInput from "../../../../Components/Layouts/Alertas/MensajeErrorInput";
import Spinner from "../../../../Components/Layouts/Spinners/Spinner";
import Paginacion from "../../../../Components/Layouts/Paginacion/Paginacion";
import { formatNumber } from "../../../../Components/Helpers/formatoNumero";

const AgregarInventarioV2 = ({
  crearInventario,
  limpiarInventario,
  mostrarPunto,
  mostrarProductos,
  producto: { productos, loading, totalProductos, totalPaginas },
  punto: { puntos },
}) => {
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);
  const [nroPagina, setNroPagina] = useState(1);

  const [puntoSeleccionado, setPuntoSeleccionado] = useState("");
  const [puntosArray, setPuntosArray] = useState([]);

  const [inputSeleccionadosArray, setInputSeleccionadosArray] = useState([]);

  useEffect(() => {
    mostrarProductos(limit, skip);
    mostrarPunto();
  }, []);

  useEffect(() => {
    if (puntosArray.length == 0) {
      setPuntosArray(puntos);
    }
  }, [puntos]);
  useEffect(() => {
    //console.log(skip)
    //console.log(totalProductos)
    if (totalProductos) {
      if (skip >= totalProductos) {
        setSkip(skip - limit);
        setNroPagina(nroPagina - 1);
      } else {
        mostrarProductos(limit, skip);
      }
    }
  }, [skip]);

  const cambiarPagina = (e, page) => {
    setNroPagina(page);
    setSkip(totalPaginas[page - 1]);
  };

  var productosMarcados = [
    {
      itemID: "646b560d91ef520be682ad7a",
    },
  ];
  //console.log(puntoSeleccionado);
  const guardarSeleccion = async (e, itemID) => {
    //console.log(e.target.checked)
    const { checked } = e.target;
   /*  console.log(checked); */
    if (checked == true) {
      setInputSeleccionadosArray([
        ...inputSeleccionadosArray,
        {
          itemID: itemID,
        },
      ]);
    } else {
      const remove = await removeIndex(inputSeleccionadosArray, itemID);
      // console.log(remove)
      const list = inputSeleccionadosArray;
      list.splice(remove, 1);
      setInputSeleccionadosArray([...list]);

      /* console.log(inputSeleccionadosArray); */
    }
  };

  const eliminarProductoList = async ( itemID ) =>{
    /* console.log(itemID) */
    const remove = await removeIndexInventario(arrayInventarioList, itemID);
    // console.log(remove)
    const list = arrayInventarioList;
    list.splice(remove, 1);
    setInputSeleccionadosArray([...list]);

   /*  console.log(arrayInventarioList); */
  }

  const removeIndex = (list, value) => {
    for (let i = 0; i < list.length; i++) {
     /*  console.log(list) */
      if (list[i].itemID === value) {
      /*   console.log(list) */
        return i;
      }
    }
  };

  const removeIndexInventario = (list, value) => {
    for (let i = 0; i < list.length; i++) {
      //console.log(list)
      if (list[i].idProducto === value) {
       // console.log(list)
        return i;
      }
    }
  };

  const [datosInput, setDatosInput] = useState("");
  const [arrayInventarioList, setInventarioList] = useState([]);
  const guardarArrayDatos = (idProducto) => {
    setInventarioList([
      ...arrayInventarioList,
      {
        idProducto: idProducto,
        cantidad: datosInput,
        destino: puntoSeleccionado,
      },
    ]);
  };


  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className=" container-fluid  ">
            <div className="row justify-content-center ">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="col-12 mt-3" align="center">
                      <br />
                      <h4 className="card-title">
                        <Link to="/inventario">
                          <button
                            type="button"
                            className="btn btn-inverse-success btn-icon"
                          >
                            <i className="ti-arrow-left"></i>
                          </button>
                        </Link>{" "}
                        Volver
                      </h4>
                      <h2 className="card-title space">
                        AGREGAR NUEVO INVENTARIO
                      </h2>

                      <h6>Seleccionar Punto Fijo</h6>

                      <div className="wrapperPuntosFijo ">
                        {puntosArray?.length > 0 &&
                          puntosArray?.map((punto) => {
                            if (
                              punto?.tipo == "PuntoFijo" ||
                              punto?.tipo == "PuntoBarrio" ||
                              punto?.tipo == "PuntoInterior"
                            ) {
                              return (
                                <div className="card cardPuntosSelect">
                                  <input
                                    type="radio"
                                    name="select"
                                    className="optionInput"
                                    id={"option-" + punto?.uid}
                                    onClick={() => {
                                      setPuntoSeleccionado(punto?.nombre);
                                    }}
                                  />
                                  <label
                                    for={"option-" + punto?.uid}
                                    className={"option option-" + punto?.uid}
                                  >
                                    <div className="dot"></div>
                                    <span>{ punto?.tipo == "PuntoBarrio" || punto?.tipo == "PuntoInterior" ? punto?.barrio : punto?.nombre}</span>
                                  </label>
                                </div>
                              );
                            }
                          })}
                      </div>

                      <hr />
                    </div>
                    {productos?.length > 0 ? (
                      <div className="containerInputsCheck" align="center">
                        {productos?.map((item) => {
                          let productoChecked;
                          let valorCantidad = null
                          let existeProducto = false
                          for (var i = 0; i < inputSeleccionadosArray?.length;i++) {
                            if (inputSeleccionadosArray[i]?.itemID == item?.uid) {
                              productoChecked = inputSeleccionadosArray[i]?.itemID;
                              
                            }
                          }

                          for (var i = 0; i < arrayInventarioList?.length;i++) {
                            if (arrayInventarioList[i]?.idProducto == item?.uid) {
                              valorCantidad = arrayInventarioList[i]?.cantidad;

                              existeProducto = true
                              
                            }
                          }
                          return (
                            <>
                              <input
                                type="checkbox"
                                name={item?.uid}
                                id={item?.uid}
                                className="checkbox-input"
                                onChange={(e) => {
                                  guardarSeleccion(e, item?.uid);
                                }}
                                checked={
                                  productoChecked == item?.uid || existeProducto == true ? true : false 
                                }
                              />
                              <label for={item?.uid} className="checkbox-label">
                                <div className="checkbox-text">
                                  <p className="checkbox-text--title">
                                    {item?.nombre}
                                  </p>
                                  <img className="imgProductoCheckbox" src={item?.img} alt="Foto Del Producto"></img>
                                  <p className="checkbox-text--description">
                                    <span className="seleccionarProducto">
                                      Seleccionar producto
                                    </span>
                                    <span className="selecccionado">
                                      Precio: $ {formatNumber(item?.precio)} |
                                      Unidad: {item?.unidad}
                                    </span>
                                    <br />
                                    <span className="selecccionado">
                                      {puntoSeleccionado
                                        ? puntoSeleccionado
                                        : "No Hay Punto Seleccionado"}
                                    </span>
                                  </p>

                                  <div className="inputsSelect">
                                  {
                                          productoChecked == item?.uid || existeProducto == true
                                          ?
                                   <>
                                    <div className="inputDivCard">
                                      <input
                                        disabled={
                                          productoChecked == item?.uid
                                            ? false
                                            : true
                                        }
                                        value={valorCantidad ? valorCantidad : datosInput}
                                        type="number"
                                        onChange={(e) => {
                                          setDatosInput(e.target.value);
                                        }}
                                        placeholder={
                                          "Ingresar La Cantidad en " +
                                          item?.unidad
                                        }
                                      ></input>
                                    </div>
                                    <div className="mt-3">
                                      
                                      {
                                        existeProducto ?
                                       <>
                                        
                                        <button className="btn btn-danger mx-2" onClick={()=>{eliminarProductoList(item?.uid)}}>Eliminar</button>
                                       </>
                                        : 
                                        <button  className="btn btn-success mx-2" onClick={()=>{guardarArrayDatos(item?.uid)}}>Guardar</button>
                                      }
                                    </div>
                                   </>
                                        :
                                        null}
                                  </div>
                                </div>
                              </label>
                            </>
                          );
                        })}
                      </div>
                    ) : (
                      <div align="center">
                        <Spinner />
                      </div>
                    )}

                    <div className="wrapper">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={() => {
                                setSkip(skip - limit),
                                  setNroPagina(parseInt(nroPagina - 1));
                              }}
                              type="button"
                              disabled={skip == 0 ? true : false}
                            >
                              Anterior
                            </button>
                          </li>
                          {/* <li className="page-item"><button type="button" className="page-link">{nroPagina}</button></li> */}
                          <Paginacion
                            nroPagina={nroPagina}
                            cambiarPagina={cambiarPagina}
                            totalPaginas={totalPaginas}
                          />
                          <li className="page-item">
                            <button
                              type="button"
                              className="page-link"
                              onClick={() => {
                                setSkip(skip + limit),
                                  setNroPagina(parseInt(nroPagina + 1));
                              }}
                              disabled={skip >= totalProductos ? true : false}
                            >
                              Siguiente
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                      <div align="center">
                        <button disabled={arrayInventarioList.length > 0 ? false : true} className="btn btn-success">Finalizar Inventario</button>
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

AgregarInventarioV2.propTypes = {
  crearInventario: PropTypes.func.isRequired,
  limpiarInventario: PropTypes.func.isRequired,
  mostrarPunto: PropTypes.func.isRequired,
  puntos: PropTypes.object.isRequired,
  mostrarProductos: PropTypes.func.isRequired,
  productos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  punto: state.puntosReducer,
  producto: state.productosReducer,
});

export default connect(mapStateToProps, {
  mostrarProductos,
  crearInventario,
  mostrarPunto,
  limpiarInventario,
})(AgregarInventarioV2);
