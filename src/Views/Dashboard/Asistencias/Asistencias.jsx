import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Container from "../../../Components/Layouts/Container/Container";
import Footer from "../../../Components/Layouts/Footers/Footer";
import {getAsistencias} from "../../../Redux/Actions/asistencia.action"

const Asistencias = ({getAsistencias, lista:{asistenciaPunto, loading}}) => {
  
  useEffect(()=>{
    getAsistencias()
  },[])
  
 /*  console.log(asistenciaPunto) */
  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card shadow">
              <div class="card-body">
                <div>
                  
                  <h4 className="card-title">Asistencias De Hoy</h4>

                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr align="center">
                          <th>#</th>
                          <th>Fecha De La Lista</th>
                          <th>Punto</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          asistenciaPunto?.length > 0 && asistenciaPunto?.map((item)=>{
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
                          <td>{item?.punto?.nombre}</td>
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

Asistencias.propTypes = {
  getAsistencias: PropTypes.func.isRequired,
  asistenciaPunto: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lista: state.asistenciaReducer,
});

export default connect(mapStateToProps, { getAsistencias })(Asistencias);

