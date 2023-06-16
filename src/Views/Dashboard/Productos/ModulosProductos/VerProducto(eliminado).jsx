import React, { useState, useEffect } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import { useForm } from "../../../../Components/Hooks/UseForm";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./StyleProductos/vistaproducto.scss";
import imagenVerProducto from "../../../../Components/Assets/Images/productover.png";
import { mostrarProductoUnico } from "../../../../Redux/Actions/productos.action";

const VerProducto = ({}) => {
  let dispatch = useDispatch();
  const { id } = useParams();
  const { producto } = useSelector((state) => state.editProducto);

  useEffect(() => {
    dispatch(mostrarProductoUnico(id));
  }, []);

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className=" container-fluid  ">
            <div className="row justify-content-center ">
              <div>
                <div className="card shadow-lg ">
                  <div className="row  mx-auto justify-content-center text-center">
                    <div className="col-12 mt-3 ">
                      <br />
                      <h2 className="card-title space">
                        PRODUCTO
                        <img
                          src={imagenVerProducto}
                          alt=""
                          className="itemImg"
                          style={{
                            width: "7vh",
                            position: "relative",
                            top: "-2vh",
                          }}
                        />
                      </h2>
                      <hr />
                    </div>
                  </div>

                  <div className="row justify-content-around">
                    <div className="col-md-5">
                      <div className="card border-0">
                        <div className="card-header pb-0"></div>
                        <div className="card-body">
                          <div class="form-group">
                            <h3>
                              NOMBRE
                              <hr style={{ background: "#045694" }} />
                            </h3>

                            <h4>📌 {producto.nombre}</h4>
                          </div>

                          <div class="form-group mt-5">
                            <h3>
                              PRECIO
                              <hr style={{ background: "#045694" }} />
                            </h3>

                            <h4>📌${producto.precio}</h4>
                          </div>

                          <div class="form-group mt-5">
                            <h3>
                              DESCRIPCION
                              <hr style={{ background: "#045694" }} />
                            </h3>

                            <h4>📌{producto.descripcion}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="card border-0 ">
                        <div className="card-header card-2">
                          <div class="form-group">
                            <div class="form-group">
                              <h3>
                                DISTRIBUIDOR
                                <hr style={{ background: "#045694" }} />
                              </h3>

                              <h4>📌{producto?.distribuidor?.nombre}</h4>
                            </div>
                          </div>

                          <div class="form-group mt-5">
                            <h3>
                              ULTIMA ACTUALIZACIÓN{" "}
                              <hr style={{ background: "#045694" }} />
                            </h3>
                            <h4>📌{producto.updatedAt}</h4>
                          </div>
                        </div>
                      </div>
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

const mapStateToProps = (state) => ({
  producto: state.productosReducer.producto,
});

export default connect(mapStateToProps, {})(VerProducto);
