import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import "./StyleParte/VerDetalles.css";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../../Components/Helpers/formatoNumero.js";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const VerDetallesParte = ({ parteDia: { parte_dia, loading } }) => {
  //console.log(parte_dia)
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [guardarDistribuidores, setGuardarDistribuidores] = useState([]);
  const [mostrarHeader, setMostrarHeader] = useState(false);
  /* const [fechaGeneralFormateada, setFechaGeneralFormateada] = useState() */
  let fechaGeneral = new Date(parte_dia[0]?.fecha);
  let fechaFormateadaGeneral = fechaGeneral.toLocaleDateString("es-ES");

  const [dataCambioInicial, setDataCambioInicial] = useState("")
  const cambiarEstado = async (cambiInicial, data) => {
    setMostrarHeader(true);
    /* console.log(data) */
    if (data) {
      setGuardarDistribuidores(data);
      setMostrarDatos(true);
      setDataCambioInicial(cambiInicial)
    } else {
      setGuardarDistribuidores([]);
      setMostrarDatos(false);
      setDataCambioInicial("")
    }
  };

  useEffect(()=>{
    console.log(dataCambioInicial)
  },[dataCambioInicial])
  const [mostrarDetallesStock, setMostrarDetallesStock] = useState("")

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="event-schedule-area-two bg-color pad100">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <Link to="/parte-del-dia">
                    <button
                      type="button"
                      className="btn btn-inverse-success btn-icon"
                    >
                      <i className="ti-arrow-left"></i>
                    </button>
                  </Link>
                  <div className="section-title text-center">
                    <div className="title-text">
                      <h2>PARTE DEL DIA</h2>
                    </div>
                    <p>
                      Todos los Partes Diarios de la Fecha{" "}
                      {fechaFormateadaGeneral}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <ul className="nav custom-tab" id="myTab" role="tablist">
                    {parte_dia?.map((ubi) => {
                      return (
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="profile-tab"
                            data-toggle="tab"
                            href={`#profile${ubi?.uid}`}
                            role="tab"
                            aria-controls={`#profile${ubi?.uid}`}
                            aria-selected="false"
                            onClick={() => {
                              cambiarEstado();
                            }}
                          >
                            {ubi?.ubicacion?.nombre}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  {mostrarHeader ? (
                    <div className="tab-content" id="myTabContent">
                      {parte_dia?.map((data) => {
                        /*   console.log(data?.fecha)
                          console.log(dia) */
                        //console.log(data)
                        //console.log()
                        let fecha = new Date(data?.fecha);
                        let fechaFormateada = fecha.toLocaleDateString("es-ES");
                        
                        return (
                          <div
                            className="tab-pane fade"
                            id={`profile${data?.uid}`}
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                          >
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr align="center">
                                    <th scope="col">Perfil</th>
                                    <th scope="col">Nombre Completo</th>
                                    <th scope="col">Total Recaudado</th>
                                    <th scope="col">Ver</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="inner-box" align="center">
                                    <td>
                                      <div className="event-img">
                                        <img src={data?.usuario?.img} alt="" />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="event-wrap">
                                        <h3>
                                          <a href="#">
                                            {data?.usuario?.nombre}{" "}
                                            {data?.usuario?.apellido}
                                          </a>
                                        </h3>
                                        <div className="meta">
                                          <div className="organizers">
                                            <a>
                                              <span className="ti-location-pin"></span>{" "}
                                              {data?.ubicacion?.barrio}
                                            </a>
                                          </div>
                                          <div className="categories">
                                            <a>
                                              <span className="ti-user"></span>{" "}
                                              Distribuidores:{" "}
                                              {data?.distribuidor?.length}
                                            </a>
                                          </div>
                                          <div className="time">
                                            <span>
                                              FECHA: {fechaFormateada}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="r-no">
                                        <span style={{ color: "green" }}>
                                          ${" "}
                                          {formatNumber(data?.recaudacionTotal)}{" "}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="primary-btn">
                                        {mostrarDatos ? (
                                          <a
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => {
                                              cambiarEstado();
                                            }}
                                          >
                                            <span className="ti-angle-up"></span>
                                          </a>
                                        ) : (
                                          <a
                                            className="btn btn-success"
                                            type="button"
                                            onClick={() => {
                                              cambiarEstado(data?.cambioInicial, data.distribuidor);
                                            }}
                                          >
                                            <span className="ti-angle-down"></span>
                                          </a>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      className="container"
                      align="center"
                      style={{ cursor: "pointer", color: "green" }}
                    >
                      <h3>
                        <i className="ti-hand-point-up"></i>Seleccionar Un Punto
                      </h3>
                    </div>
                  )}

                  {mostrarDatos ? (
                    <>
                      <div className="container">
                        <div className="main-body-detalles">
                          <div className="row gutters-sm">
                            <div>
                              <div className="card-pd mt-3">
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item  justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Cambio Inicial:</h6>
                                    <span className="text-secondary my-2">
                                      {dataCambioInicial}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div className="card-pd mb-3">
                                <div className="card-pd-body">
                                  {guardarDistribuidores?.map((pd) => {
                                    // console.log(guardarDistribuidores)
                                    return (
                                      <>
                                        <div className="row">
                                          <div className="col-sm-3">
                                            <h6 className="mb-0">
                                              {pd?.nombre?.nombre}
                                            </h6>
                                          </div>
                                          <div className="col-sm-9 text-secondary">
                                            Productos Registrados:{" "}
                                            {pd?.stock?.length}
                                          </div>
                                        </div>
                                        <hr />
                                      </>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="row gutters-sm">
                                {guardarDistribuidores?.map((pd) => {
                                  return (
                                    <>
                                      <div className="col-sm-6 mb-3">
                                        <div className="card-pd h-100">
                                          <div className="card-pd-body">
                                            <h6 className="d-flex align-items-center mb-3">
                                              <i className="material-icons text-info mr-2">
                                                Distribuidor
                                              </i>
                                              {pd?.nombre?.nombre}

                                              <div className="float-right">
                                            
                                                {/* <a type="button" onClick={()=>{setMostrarDetallesStock(pd?.uid)}}>
                                                  <Tooltip
                                                    title="Ver Mas Detalles..."
                                                    className=""
                                                  >
                                                    <IconButton>
                                                      <AddCircleIcon
                                                        style={{
                                                          color: "#78ae62",
                                                        }}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                </a> */}
                                           
                                            </div>
                                            </h6>
                                            
                                           
                                            <p>Nota: {pd?.nota}</p>
                                            <p>
                                              Producto Más Vendido: {pd?.prodmasvendido?.nombre}
                                              {/* {pd?.prodmasvendido} */}
                                            </p>
                                            <hr />
                                            <div>
                                              {pd?.stock?.map((prod) => {
                                                return (
                                                  <div hidden={false}>
                                                    <h6>
                                                      Producto:{" "}
                                                      {prod?.producto?.nombre}
                                                    </h6>
                                                    <p
                                                      style={{ color: "green" }}
                                                    >
                                                      <span className="ti-package"></span>{" "}
                                                      Stock Inical:{" "}
                                                      {prod?.stockInicial}
                                                    </p>
                                                    <p style={{ color: "red" }}>
                                                      <span className="ti-clipboard"></span>{" "}
                                                      Stock Final:{" "}
                                                      {prod?.stockFinal}
                                                    </p>
                                                    <p>
                                                      Total Recaudado: ${" "}
                                                      {formatNumber(
                                                        prod?.totalRecaudado
                                                      )}
                                                    </p>
                                                    <hr />
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                    <div className="primary-btn text-center">
                        <a href="#" className="btn btn-success">Descargar PDF</a>
                    </div>
                  {/*  */}
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

VerDetallesParte.propTypes = {
  parte_dia: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  parteDia: state.parteDelDiaReducer,
});

export default connect(mapStateToProps)(VerDetallesParte);
