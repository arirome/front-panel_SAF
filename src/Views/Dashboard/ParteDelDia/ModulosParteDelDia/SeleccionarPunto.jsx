import React, { useEffect } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import "./StyleParte/SeleccionarPunto.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mostrarPunto } from "../../../../Redux/Actions/puntos.action";
import Spinner from "../../../../Components/Layouts/Spinners/Spinner";
import { Link } from "react-router-dom";

const SeleccionarPunto = ({ mostrarPunto, punto: { puntos, loading } }) => {
  useEffect(() => {
    mostrarPunto();
  }, []);

 /*    useEffect(()=>{
        console.log(puntos.length)
    },[puntos]) */

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container py-5">
          <Link to="/parte-del-dia">
                              <button
                                type="button"
                                class="btn btn-inverse-success btn-icon"
                              >
                                <i class="ti-arrow-left"></i>
                              </button>
                            </Link>
            <div align="center">
              <h2>Seleccionar Punto</h2>
            </div>
            <div className="py-5">
              <div className="row">
                <div className="col-lg-9 mx-auto">
                  {loading || puntos?.length == 0 ? (
                    <div align="center">
                        <Spinner />
                    </div>
                  ) : (
                    <>
                      {puntos?.map((item) => {
                        if(item?.tipo == "PuntoFijo" || item?.tipo == "PuntoBarrio" || item?.tipo == "PuntoInterior"){
                          return (
                            <Link to={`/agregar-parte/${item.uid}/${item?.nombre}`} className="linkPagina" >
                              <div className="tarjetaContainer " >
                              <div className="card shadow mb-4"style={{ backgroundImage: `url("https://res.cloudinary.com/dabtnpikz/image/upload/v1684528432/PortadaPunto_admzdg.webp")` }}>
                                  <div className="card-body shadow-sm p-5 card-punto-select" >
                                  <h5 className="texto-card-punto"><strong>{item.nombre}</strong></h5>
                                  <p className="font-italic texto-card-punto">
                                      Barrio : <strong>{item.barrio}</strong>
                                  </p>
                                  </div>
                              </div>
                              </div>
                            </Link>
                          );
                        }
                      })}
                    </>
                  )}
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

SeleccionarPunto.propTypes = {
  mostrarPunto: PropTypes.func.isRequired,
  puntos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  punto: state.puntosReducer,
});

export default connect(mapStateToProps, { mostrarPunto })(SeleccionarPunto);
