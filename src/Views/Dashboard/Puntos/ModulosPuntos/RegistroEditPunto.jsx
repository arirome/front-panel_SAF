import React, { useState, useEffect, useRef } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import { useForm } from "../../../../Components/Hooks/UseForm";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { startUpdatePunto } from "../../../../Redux/Actions/puntos.action";

import imagenEditarMapa from "../../../../Components/Assets/Images/editar-mapa.png";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import MensajeErrorInput from "../../../../Components/Layouts/Alertas/MensajeErrorInput";
import MapView from "../../../../Components/Layouts/Map/MapView";
import { Spinner } from "react-bootstrap";

const RegistroEditPunto = ({ data: { punto, loading }, startUpdatePunto }) => {

/*   const strToBool = str => {
    switch(str.toLowerCase()) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return;
    }
  }; */
  const inputFileRef= useRef()
  const [descripcionPunto, setDescripcionPunto] = useState(punto?.descripcion)
  const [tipoPunto, setTipoPunto] = useState(punto?.tipo)
  const [imgPunto, setImgPunto] = useState(punto?.img)
  const [ubiPunto, setUbiPunto] = useState({})
  const [ubiAnterior, setUbiAnterior] = useState(punto?.ubicacion)

  const cambiarValor = (e) => {
    const { name, value } = e.target;
    if(name == "tipo"){
      setTipoPunto(value)
    }else if (name == "descripcion"){
      setDescripcionPunto(value)
    }else if (name == "imagen"){
      //console.log(URL.createObjectURL(e.target.files[0]))
      setImgPunto(URL.createObjectURL(e.target.files[0]))
    }

    //console.log(name, value)
  }

  const guardarUbi = (ubi) =>{
    /* console.info(ubi) */
    setUbiPunto(ubi)
  }

  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = async (values) => {
    setIsLoading(true)
    const imagen = inputFileRef.current.files[0]

    const ubiObj = {
      lat: ubiPunto?.lat,
      lon: ubiPunto?.lng
    };
    const formData = new FormData();
    

/*     console.log(ubiObj) */

    formData.append('nombre', values.nombre)
    formData.append('departamento', values.departamento)
    formData.append('barrio', values.barrio)
    formData.append('descripcion', descripcionPunto)
    formData.append('tipo', tipoPunto)
    formData.append('image', imagen ? imagen : imgPunto)
    formData.append('ubicacion', JSON.stringify(ubiObj))
   /*  const data = {
      nombre: values.nombre,
      departamento: values.departamento,
      barrio: values.barrio,
      descripcion : descripcionPunto,
      tipo: tipoPunto,
      image : imagen,
      ubicacion : ubiPunto,
    } */
   
    //console.log(values)

    await startUpdatePunto({
      punto: formData,
      idPunto: punto?.uid
    }
    )
    setIsLoading(false)
  };

  const formikRef = useRef();
  const schemaFormEditPunto = yup.object().shape({
    nombre: yup.string().required("El nombre del punto es requerido"),
    descripcion: yup.string().required("La Descripcion del punto es requerida"),
    departamento: yup
      .string()
      .required("El Departamento del punto es requerido"),
    barrio: yup.string().required("El barrio del punto es requerido"),
  
  });
/*   console.log(punto)  */

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
                      <h4 className="card-title">
                        <Link to="/puntos">
                          <button
                            type="button"
                            class="btn btn-inverse-success btn-icon"
                          >
                            <i class="ti-arrow-left"></i>
                          </button>
                        </Link>{" "}
                        Volver
                      </h4>
                      <br />
                      <h2 className="card-title space">
                        <img
                          src={imagenEditarMapa}
                          alt=""
                          className="itemImg"
                          style={{
                            width: "8vh",
                            position: "relative",
                            top: "-1vh",
                          }}
                        />
                        EDITAR PUNTO
                      </h2>

                      <hr />
                    </div>
                  </div>

                  <Formik
                    enableReinitialize={true}
                    innerRef={formikRef}
                    initialValues={{
                      nombre: punto?.nombre,
                      departamento: punto?.departamento,
                      descripcion: punto?.descripcion,
                      barrio: punto?.barrio
                    }}
                    onSubmit={handleAdd}
                    validationSchema={schemaFormEditPunto}
                  >
                    {({ isSubmitting, dirty }) => (
                      <Form id="formAuthentication" className="form-group">
                      <div className="row justify-content-around">
                        <div className="col-md-6">
                          <div className="card border-0">
                            <div className="card-header card-2 pb-0"></div>
                            <div className="card-body">
                              <div className="mb-3">
                                <label
                                  htmlFor="nombre"
                                  className="small text-muted mb-1"
                                >
                                  Nombre Del Punto
                                </label>
                                <div className="content-inputs">
                                  <Field
                                    type="text"
                                    className="form-control form-control-sm"
                                    name="nombre"
                                    id="nombre"
                                  />
                                  <MensajeErrorInput
                                    name="nombre"
                                    className="alert alert-danger"
                                  />
                                </div>
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="departamento"
                                  className="small text-muted mb-1"
                                >
                                  Departamento
                                </label>
                                <div className="content-select">
                                <Field
                                      className="form-control form-control-sm"
                                      as="select"
                                      id="departamento"
                                      name="departamento"
                                    >
                                      <option disabled value="">
                                        Lista De Departamentos
                                      </option>
                                      <option value="Bermejo">Bermejo</option>
                                      <option value="Formosa">Formosa</option>
                                      <option value="Laishí">Laishí</option>
                                      <option value="Matacos">Matacos</option>
                                      <option value="Patiño">Patiño</option>
                                      <option value="Pilagás">Pilagás</option>
                                      <option value="Pilcomayo">Pilcomayo</option>
                                      <option value="Pirané">Pirané</option>
                                      <option value="Ramón Lista">Ramón Lista</option>
                                    </Field>
                                    <MensajeErrorInput
                                      name="unidad_producto"
                                      className="alert alert-danger"
                                    />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="card border-0">
                            <div className="card-header card-2 pb-0"></div>
                            <div className="card-body">
                              <div className="mb-3">
                              <label
                                      htmlFor="descripcion"
                                      className="small text-muted mb-1"
                                    >
                                      Descripcion
                                    </label>
                                <div className="content-inputs">
                                <Field
                                      className="form-control form-control-sm"
                                      type="text"
                                      id="descripcion"
                                      name="descripcion"
                                      placeholder="Por favor ingrese la descripcion del punto"
                                      value={descripcionPunto}
                                      onChange={(e)=>{cambiarValor(e)}}
                                    />
                                 
                                  
                                </div>
                              </div>

                              <div className="mb-3">
                              <label
                                      htmlFor="barrio"
                                      className="small text-muted mb-1"
                                    >
                                      Barrio
                                    </label>
                                <div className="content-inputs">
                                <Field
                                      type="text"
                                      className="form-control form-control-sm"
                                      id="barrio"
                                      name="barrio"
                                      placeholder="Por favor ingrese el barrio del punto"
                                    />
                              
                                  <MensajeErrorInput
                                    name="barrio"
                                    className="alert alert-danger"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="card border-0">
                            <div className="card-header card-2 pb-0"></div>
                            <div className="card-body">
                              <div className="mb-3">
                              <div align="center">
                                    {/* <figure>
                                        <img class="logo-form" src={imgPunto} />
                                    </figure> */}
                                  <h3 class="h3 mb-4">SUBIR IMAGEN</h3>
                                  <p class="p-detalle">Puedes ver la imagen seleccionada al crear el punto en el mapa</p>
                                  <div >
                                    <div >
                                      <input type="file"  ref={inputFileRef} name="imagen" onChange={(e)=>{cambiarValor(e)}}></input>
                                    </div>
                                  </div> 
                                </div>

                                <MapView
                                descripcionPunto= {descripcionPunto}
                                imgPunto= {imgPunto}
                                tipoPunto= {tipoPunto}
                                ubiAnterior = {ubiAnterior}
                                guardarUbi = {guardarUbi}
                                />

                                <div className="content-select" style={{marginTop:"30px"}} align="center">
                                <Field
                                      className="form-control form-control-sm"
                                      as="select"
                                      id="tipo"
                                      name="tipo"
                                      value={tipoPunto}
                                      onChange={(e)=>{cambiarValor(e)}}
                                    >
                                      <option disabled value="">
                                        Tipos de Puntos
                                      </option>
                                      <option value="PuntoFijo">Punto Fijo</option>
                                      <option value="PuntoVisitado">Punto Visitado</option>
                                      <option value="PuntoInterior">Punto Del Interior</option>
                                      <option value="PuntoBarrio">Punto Del Barrio</option>
                                     
                                    </Field>
                                </div>
                                    
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        {
                          isLoading ?
                          <div align="center">
                            <Spinner/>
                          </div>
                          :
                      <div align="center">
                          <button type="submit" className="btn btn-warning">
                          Editar Punto
                        </button>
                      </div>
                        }
                    </Form>
                    )}
                  </Formik>
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

RegistroEditPunto.propTypes = {
  punto: PropTypes.object.isRequired,
  startUpdatePunto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.puntosReducer,
});

export default connect(mapStateToProps, {startUpdatePunto})(RegistroEditPunto);
