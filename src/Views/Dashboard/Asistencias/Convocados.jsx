import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "../../../Components/Layouts/Container/Container";
import Footer from "../../../Components/Layouts/Footers/Footer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { getConvocados } from "../../../Redux/Actions/asistencia.action";

const Convocados = ({getConvocados, lista:{convocados, loading}}) => {

  useEffect(()=>{
    getConvocados()
  },[])

  console.log(convocados?.length)
  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card shadow">
              <div class="card-body">
                <div>
                  <div className="float-right">
                  <Link to="/agregar-convocados">
                      <Tooltip title="Agregar Nuevo..." className="">
                        <AddBoxIcon>
                          <AddCircleIcon style={{ color: "#78ae62" }} />
                        </AddBoxIcon>
                      </Tooltip>
                    </Link>
                  </div>
                  <h4 className="card-title">Convocados</h4>

                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr align="center">
                          <th>#</th>
                          <th>Fecha</th>
                          <th>Punto</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          convocados?.length > 0 && convocados?.map((item)=>{
                            let fecha = new Date(item?.fecha).toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
                                const palabras = fecha.split(" ");
                                for (let i = 0; i < palabras.length; i++) {
                                  palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substring(1);
                                }
                                const fechaMayusculas = palabras.join(" ");
                               /*  console.log(item) */
                            return(
                          <tr align="center">
                          <td className="py-1">
                            <img
                              src="https://images.vexels.com/media/users/3/199820/isolated/preview/892bfdfcb80b356c53405aafbb716513-caja-de-carton-isometrica.png"
                              alt="image"
                            />
                          </td>
                          <td>{fechaMayusculas}</td>
                          <td>{item?.punto}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-inverse-success btn-icon"
                            >
                              <i className="ti-eye"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-inverse-warning btn-icon mx-2"
                            >
                              <i className="ti-pencil"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-inverse-danger btn-icon"
                            >
                              <i className="ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                            )
                          })
                        }
                        
                      </tbody>
                    </table>
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



Convocados.propTypes = {
  getConvocados: PropTypes.func.isRequired,
  convocados: PropTypes.object.isRequired,
  
};

const mapStateToProps = (state) => ({
  lista: state.asistenciaReducer,
});

export default connect(mapStateToProps, { getConvocados })(Convocados);


