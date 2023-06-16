import React, { useState } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import "./StyleParte/AgregarParteDelDia.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getDistribuidores,
  getProductosDistribuidores,
} from "../../../../Redux/Actions/distribuidores.action";
import { useEffect } from "react";
import { formatNumber } from "../../../../Components/Helpers/formatoNumero";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import Spinner from "../../../../Components/Layouts/Spinners/Spinner";
import ModalAgregarNota from "./ModalAgregarNota";
import { Link } from "react-router-dom";
import ConfirmarParte from "./ConfirmarParte";
import imgCaja from "../../../../Components/Assets/Images/Icons/CajaVacia.png";
import imgDistribuidor from "../../../../Components/Assets/Images/Icons/distribuidores.png"
import ModalCambioInicial from "./ModalCambioInicial";

const AgregarParteDelDia3 = ({
  getDistribuidores,
  getProductosDistribuidores,
  distribuidor: {
    distribuidores,
    productos_distribuidores,
    cantidad_productos_distribuidores,
  },
  match,
}) => {
  const [isLoaderProducto, setIsLoaderProducto] = useState(false);
  const [distribuidorSeleccionado, setDistribuidorSeleccionado] = useState();

  const [inputStockInical, setInputStockInicial] = useState(0);
  const [inputStockFinal, setInputStockFinal] = useState(0);
 /*  const [inputNroFamilias, setInputNroFamilias] = useState(0); */
  const [inputNota, setInputNota] = useState("No hay nota");
  const [inputCambioInicial, setInputCambioInicial] = useState("No hay Cambio Inicial");

  const [ocultarBotonGeneral, setOcultarBotonGeneral] = useState(false);

  //Estado para guardar todos los productos
  const [productosList, setProductosList] = useState([]);
  const [listaCreada, setListaCreada] = useState(false);

  const [optSmModalNota, setOptSmModalNota] = useState(false);
  

  const toggleShowNotas = (item) => {
    if (item) {
      setInputNota(item);
      /* console.log(item); */
    }
    setOptSmModalNota(!optSmModalNota);
  };

  const [optSmModalCambioIncial, setOptSmModalCambioIncial] = useState(false);
  const toggleShowCambioInicial = (data) => {
    if(data){
      setInputCambioInicial(data)
    }
    setOptSmModalCambioIncial(!optSmModalCambioIncial);
  }

  useEffect(() => {
    getDistribuidores();
    getProductosDistribuidores();
  }, []);

  //Funcion para mostrar los productos de un distribuidor en especifico.
  const consultarProductos = async (id) => {
    setInputStockInicial(0);
    setInputStockFinal(0);
    setOcultarBotonGeneral(false);
    setDistribuidorSeleccionado(id);
    setIsLoaderProducto(true);
    /* console.log(id) */
    if (id) {
      await getProductosDistribuidores(id);
      /* setDataProductos(res.data) */
      setIsLoaderProducto(false);
    }
  };

  //Estado para ir guardando el total Recaudado Cuando se registre un nuevo producto er el parte
  const [totalRecaudadoFinal, setTotalRecaudadoFinal] = useState(0);
  const [nroProductosRegistrados, setNroProductosRegistrados] = useState(0);


  const guardarValorInputs = async (itemID, precio, nombre) => {
    const precioProducto = parseInt(precio);
    const stockTotal = parseInt(inputStockInical - inputStockFinal);
    const recaudado = precioProducto * stockTotal;
    //console.log(precioProducto * stockTotal)
 /*    console.log(totalRecaudadoFinal);
    console.log(recaudado); */
    
    setTotalRecaudadoFinal(parseInt(totalRecaudadoFinal + recaudado));

    await setProductosList([
      ...productosList,
      {
        producto: itemID,
        productoNombre: nombre,
        stockInicial: inputStockInical,
        stockFinal: inputStockFinal,
        precioProducto: precioProducto,
        totalvendido: stockTotal,
        totalRecaudado: recaudado,
      },
    ]);
    setListaCreada(true);
    setNroProductosRegistrados(nroProductosRegistrados + 1);
    setInputStockInicial(0);
    setInputStockFinal(0);
   
    /* console.log(productosList) */
  };

  /*  useEffect(() => {
    console.log(productosList);
  }, [productosList]); */

  //Funcion Para Guardar Todos los productos en el distribuidor Correspondiente
  const [listDistribuidores, setListDistribuidores] = useState([]);

  const guardarDistribuidor = () => {
    /*  window.scrollTo({
       top: document.body.scrollHeight,
       behavior: 'smooth',
     }) */

    setOcultarBotonGeneral(true);
    var productoMasVendido = -1;
    var nombreProducto = "";

    for (var i = 0; i < productosList.length; i++) {
      //console.log("nro: ", i)
      if (productosList[i].totalvendido > productoMasVendido) {
        productoMasVendido = productosList[i].totalvendido;
        nombreProducto = productosList[i].producto;
      }
    }

    //console.log(nombreProducto)

    setListDistribuidores([
      ...listDistribuidores,
      {
        nombre: distribuidorSeleccionado,
        nota: inputNota,
        /* familiasParticipantes: inputNroFamilias, */
        stock: productosList,
        prodmasvendido: nombreProducto,
      },
    ]);
    setProductosList([]);
    setListaCreada(false);
    setNroProductosRegistrados(0);
    setDistribuidorCompletado(true)
  };



  const eliminarProductoList = async (itemID) => {
    /*    console.log(itemID)
    console.log(productosList) */

    const remove = await removeIndex(productosList, itemID);
 
    setNroProductosRegistrados(nroProductosRegistrados - 1);
    // console.log(remove)
    const list = productosList;
    list.splice(remove, 1);
    setProductosList([...list]);

    if (list.length == 0) {
      setListaCreada(false);
    }

    /*     console.log(arrayInventarioList); */
  };

  const eliminarDistribuidorList = async (itemID) => {
 

    const remove = await removeIndexDistribuidor(listDistribuidores, itemID);
  
    
  
    const list = listDistribuidores;
    list.splice(remove, 1);
    setListDistribuidores([...list]);
    setDistribuidorCompletado(false)
    /* if (list.length == 0) {
      setListaCreada(false);
    } */

    /*     console.log(arrayInventarioList); */
  };

  const removeIndex = (list, value) => {
    for (let i = 0; i < list.length; i++) {
      //console.log(list)
      if (list[i].producto === value) {
        /* console.log(list) */
        return i;
      }
    }
  };

  const removeIndexDistribuidor = (list, value) => {
    for (let i = 0; i < list.length; i++) {
      //console.log(list)
      if (list[i].nombre === value) {
        /* console.log(list) */
        return i;
      }
    }
  };

  //Funcion para guardar Todo los distribuidores dentro de otro array
  const [stockList, setStockList] = useState();
  const fechaActual = new Date();

  const almacenarParte = () => {
    setStockList({
      fecha: fechaActual.toLocaleDateString("es-ES"),
      cambioInicial: inputCambioInicial,
      distribuidor: listDistribuidores,
      recaudacionTotal: totalRecaudadoFinal,
      ubicacion: match.params.idPunto,
    });
  };

  const [distribuidorCompletado, setDistribuidorCompletado] = useState(false);

  useEffect(() => {
    const obj = listDistribuidores.filter(
      (item) => item.nombre === distribuidorSeleccionado
    );
    /*  console.log(obj) */
    if (obj.length > 0) {
      setDistribuidorCompletado(true);
    } else {
      setDistribuidorCompletado(false);
    }
  }, [distribuidorSeleccionado]);

  /*  console.log(distribuidorCompletado) */

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card shadow">
              <div className="card-body">
                <div>
                  <div className="float-right">
                    
                    {listDistribuidores?.length > 0 ? (
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-icon-text"
                        onClick={()=>{almacenarParte()}}
                      >
                        <i class="ti-upload btn-icon-prepend"></i>
                        Finalizar Parte Del Dia
                      </button>
                    ) : null}
                  </div>

                  <Link to="/seleccionar-punto">
                      <button
                        type="button"
                        className="btn btn-inverse-success btn-icon"
                      >
                        <i className="ti-arrow-left"></i>
                      </button>
                    </Link>
                </div>

                <div className="container " align="center">
                  <div>
                    <h5>Parte Del Dia Del Punto :{" "}
                    <b className="nombrePunto">{match.params.nombrePunto}</b></h5>
                    <a className="cambioInicial" onClick={()=>{toggleShowCambioInicial()}}>Agregar Cambio Inicial</a>
                    <hr/>
                  </div>
                  {distribuidores?.length > 0 ? (
                    <div className="row py-2">
                      {distribuidores?.map((distribuidor) => {
                        let disSeleccionado;
                        let disGuardado;

                        for (var i = 0; i < distribuidores?.length; i++) {
                          if (
                            distribuidores[i]?.uid == distribuidorSeleccionado
                          ) {
                            disSeleccionado = distribuidores[i]?.uid;
                          }
                        }

                        for (var i = 0; i < listDistribuidores?.length; i++) {
                          if (
                            listDistribuidores[i]?.nombre == distribuidor?.uid
                          ) {
                            disGuardado = listDistribuidores[i]?.nombre;
                          }
                        }

                        /*  console.info(disGuardado); */
                        return (
                          <div className="col-md-3 mb-3">
                            {disGuardado == distribuidor?.uid ? (
                              <button
                                disabled={listaCreada}
                                type="button"
                                className="btn btn-info btn-icon-text"
                                onClick={() => {
                                  consultarProductos(distribuidor?.uid);
                                }}
                              >
                                <i className="ti-check"> </i>
                                {distribuidor?.nombre}
                              </button>
                            ) : (
                              <button
                                disabled={listaCreada}
                                type="button"
                                className={
                                  disSeleccionado == distribuidor?.uid
                                    ? "btn btn-success btn-icon-text"
                                    : "btn btn-outline-success btn-icon-text"
                                }
                                onClick={() => {
                                  consultarProductos(distribuidor?.uid);
                                }}
                              >
                                <i className="ti-user"> </i>
                                {distribuidor?.nombre}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div align="center">
                      <Spinner />
                    </div>
                  )}
                </div>
                {distribuidorCompletado ? (
                  <div align="center">
                    <hr />
                    <img src={imgDistribuidor} alt="IMAGEN" width="100px"/>
                    <p>Distribuidor Completado</p>
                    <button className="btn btn-warning" onClick={()=>{eliminarDistribuidorList(distribuidorSeleccionado)}}>ELIMINAR</button>
                    <hr />
                  </div>
                ) : (
                  <div>
                    <hr />
                    <div align="center">
                      {productosList?.length > 0 ? (
                        <a
                          className="textoNota"
                          onClick={() => {
                            toggleShowNotas();
                          }}
                        >
                          <i className="ti-clipboard"> </i>Agregar Nota
                        </a>
                      ) : null}
                    </div>
                    {distribuidorSeleccionado ? (
                      <>
                        <div className="container mt-5">
                          {isLoaderProducto ? (
                            <div align="center">
                              <Spinner />
                            </div>
                          ) : (
                            <>
                              {productos_distribuidores?.length > 0 ? (
                                <div className="row">
                                  {productos_distribuidores?.map((item) => {
                                    let listaGuardada = false;
                                    let checked;
                                    let recuadadoTotal = 0;

                                    for (
                                      var i = 0;
                                      i < productosList?.length;
                                      i++
                                    ) {
                                      if (
                                        productosList[i]?.producto == item?.uid
                                      ) {
                                       
                                        checked = productosList[i]?.producto;
                                        recuadadoTotal =
                                          productosList[i]?.totalRecaudado;
                                      }
                                    }

                                    for (
                                      var i = 0;
                                      i < listDistribuidores?.length;
                                      i++
                                    ) {
                                      if (
                                        listDistribuidores[i]?.nombre ==
                                        distribuidorSeleccionado
                                      ) {
                                        listaGuardada = true;
                                      }
                                    }
                                    //console.log(recuadadoTotal);

                                    return (
                                      <div className="tarjetaProductoDistribuidor col-md-4">
                                        <div className="card p-3">
                                          <div className="d-flex flex-row mb-3">
                                            <img
                                              src={item?.img}
                                              className="ImgPortadaProducto"
                                            />
                                            <div className="d-flex flex-column ml-2">
                                              <span>{item?.nombre}</span>
                                              <span
                                                className="text-black-50"
                                                style={{ color: "green" }}
                                              >
                                                Precio:{" "}
                                                <strong>
                                                  ${formatNumber(item?.precio)}
                                                </strong>
                                              </span>
                                              {/* <span className="ratings ">
                                                Nro Familias:{" "}
                                                <input
                                                  type="number"
                                                  className="nroFamiliaInput"
                                                 
                                                  disabled={checked == item?.uid ? true : false}
                                                  onChange={(e) => {
                                                    setInputNroFamilias(
                                                      e.target.value
                                                    );
                                                  }}
                                                ></input>
                                              </span> */}
                                            </div>
                                          </div>
                                          <div className="formularioStockProducto">
                                          <form
                                            id="formAuthentication"
                                            className="form-group"
                                          >
                                            <hr />
                                            <div className="form-row">
                                              <div className="col-4">
                                                <p className="dis fw-bold mb-2">
                                                  Stock Inicial
                                                </p>
                                                <input
                                                  type="number"
                                                  name="stockInicial"
                                                  /*  value={inputStockInical} */
                                                  disabled={checked == item?.uid ? true : false}
                                                  className="form-control"
                                                  onChange={(e) => {
                                                    setInputStockInicial(
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                              </div>
                                              <div className="col-4">
                                                <p className="dis fw-bold mb-2">
                                                  Stock Final
                                                </p>
                                                <input
                                                  name="stockFinal"
                                                  /* value={inputStockFinal} */
                                                  disabled={checked == item?.uid ? true : false}
                                                  type="number"
                                                  className="form-control"
                                                  onChange={(e) => {
                                                    setInputStockFinal(
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </form>
                                          </div>
                                          {listaGuardada ? null : (
                                            <div className="d-flex justify-content-between">
                                              {recuadadoTotal == 0 ? (
                                                <p style={{ color: "green" }}>
                                                  Recaudado: $ 0.00
                                                </p>
                                              ) : (
                                                <p style={{ color: "green" }}>
                                                  Recaudado: ${" "}
                                                  {formatNumber(recuadadoTotal)}
                                                </p>
                                              )}
                                              {checked == item?.uid ? (
                                                <button
                                                  className="btn btn-danger text-white"
                                                  onClick={() => {
                                                    eliminarProductoList(
                                                      item?.uid
                                                    );
                                                  }}
                                                >
                                                  Modificar
                                                </button>
                                              ) : (
                                                <button
                                                  className="btn btn-success"
                                                  onClick={() => {
                                                    guardarValorInputs(
                                                      item?.uid,
                                                      item?.precio,
                                                      item?.nombre
                                                    );
                                                  }}
                                                >
                                                  Guardar
                                                </button>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div align="center">
                                  <img src={imgCaja} alt="IMAGEN" width="100px"/>
                                  <h3 style={{ color: "red" }}>
                                    No Hay Productos Cargados...
                                  </h3>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <div align="center">
                        {distribuidores?.length > 0 ? (
                          <h3 style={{ color: "green" }}>
                            <i className="ti-hand-point-up"> </i>Necesita
                            Seleccionar Un Distribuidor
                          </h3>
                        ) : null}
                      </div>
                    )}
                    {cantidad_productos_distribuidores == 0 ? null : (
                      <div>
                        <hr />
                        <div
                          align="center"
                          hidden={
                            cantidad_productos_distribuidores ==
                            nroProductosRegistrados
                              ? false
                              : true
                          }
                        >
                          <button
                            className="btn btn-info"
                            disabled={ocultarBotonGeneral ? true : false}
                            onClick={() => {
                              guardarDistribuidor();
                            }}
                          >
                            Guardar Todos Los Productos
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <ModalAgregarNota
            funcionGuardarNota={toggleShowNotas}
            optSmModalNota={optSmModalNota}
            setOptSmModalNota={setOptSmModalNota}
          />
          <ModalCambioInicial
            funcionGuardarCambioInicial={toggleShowCambioInicial}
            optSmModalCambioIncial={optSmModalCambioIncial}
            setOptSmModalCambioIncial={setOptSmModalCambioIncial}
          />

            <ConfirmarParte
            item={stockList}
            />
        </div>
        <Footer />
      </div>
    </Container>
  );
};

AgregarParteDelDia3.propTypes = {
  getDistribuidores: PropTypes.func.isRequired,
  getProductosDistribuidores: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  distribuidor: state.distribuidoresReducer,
});

export default connect(mapStateToProps, {
  getDistribuidores,
  getProductosDistribuidores,
})(AgregarParteDelDia3);
