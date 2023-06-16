import React from "react";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import Container from "../../../../Components/Layouts/Container/Container";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCronograma } from "../../../../Redux/Actions/cronograma.action"

const Cronograma = ({getCronograma, cronogramas:{cronograma, loading}}) => {
  useEffect(()=>{
    getCronograma()
  },[])
  console.log(cronograma)
  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div
            class="col-lg-12 grid-margin stretch-card"
            /* style={{ height: "95%" }} */
          >
            <div class="card shadow">
              <div class="card-body">
                <div>
                <div className="float-right">
                      <Link to="/agregar-cronograma">
                        <Tooltip title="Agregar Nuevo..." className="">
                          <AddBoxIcon>
                            <AddCircleIcon style={{ color: "#78ae62" }} />
                          </AddBoxIcon>
                        </Tooltip>
                      </Link>
                    </div>
                  <h4 class="card-title">Cronograma</h4>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col-lg-8 mx-auto">
                      <ul class="list-group shadow">

                        {/* {"Miercoles"} */}
                        {
                          cronograma.length > 0 ?
                          <>
                          {
                            cronograma[0]?.detalles?.map((item)=>{

                              let fecha = new Date(item?.fecha).toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
                                const palabras = fecha.split(" ");
                                for (let i = 0; i < palabras.length; i++) {
                                  palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substring(1);
                                }
                                const fechaMayusculas = palabras.join(" ");

                              return(
                                <li class="list-group-item">
                          <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                            <div class="media-body order-2 order-lg-1">
                              <h5 class="mt-0 font-weight-bold mb-2">
                                {fechaMayusculas}
                              </h5>
                               <p class="font-italic text-muted mb-0 ">
                                Los Puntos Disponibles:
                              </p>
                              <div class="align-items-center justify-content-between mt-1">
                               {
                                item?.puntos?.map((puntos)=>{
                                  return(
                                    <h6 class="font-weight-bold my-2">📌 {puntos.puntoNombre.nombre}</h6>
                                  )
                                })
                               }
                                
                              </div>
                            </div>
                            <img
                              src="https://res.cloudinary.com/dabtnpikz/image/upload/v1684160826/vkxhom3b3sbzhvvg5ba7.webp"
                              alt="Generic placeholder image"
                              width="200"
                              style={{borderRadius:"20px"}}
                              class="ml-lg-5 order-1 order-lg-2"
                            />
                          </div>
                        </li>
                              )
                            })
                          }
                          </>
                          :
                          <p>Cargando</p>
                        }
                        
                        
                      </ul>
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

Cronograma.propTypes = {
  getCronograma: PropTypes.func.isRequired,
  cronograma: PropTypes.object.isRequired,
  
};

const mapStateToProps = (state) => ({
  cronogramas: state.cronogramaReducer,
});

export default connect(mapStateToProps, { getCronograma })(Cronograma);

