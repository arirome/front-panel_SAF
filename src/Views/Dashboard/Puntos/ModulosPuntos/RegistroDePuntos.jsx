import React, { useState, useEffect, useRef } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import { useForm } from "../../../../Components/Hooks/UseForm";
import { fetchRegistroPunto } from "../../../../Redux/Actions/puntos.action";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import MensajeErrorInput from "../../../../Components/Layouts/Alertas/MensajeErrorInput";
import MapView from "../../../../Components/Layouts/Map/MapView";
import Spinner from "../../../../Components/Layouts/Spinners/Spinner";
import '../StylesPuntos/tabsPuntos.css'
import  imgAgregarPunto from '../../../../Components/Assets/Images/agregar-direccion.png'

const RegistroDePuntos = ({ fetchRegistroPunto }) => {
  
  const formikRef = useRef();
  const inputFileRef= useRef()
  const schemaFormPunto = yup.object().shape({
    nombre: yup.string().required("El nombre del punto es requerido"),
    barrio: yup.string().required("El barrio del punto es requerido")
  });

  const [descripcionPunto, setDescripcionPunto] = useState("")
  const [tipoPunto, setTipoPunto] = useState("")
  const [imgPunto, setImgPunto] = useState("")
  const [ubiPunto, setUbiPunto] = useState({})

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
    console.info(ubi)
    setUbiPunto(ubi)
  }

  
  const [latInput, setLatInput] = useState("")
  const [lonInput, setLonInput] = useState("")

  const guardarUbiInputs = (e) =>{

    
    const {name, value} = e.target
    
    if(name == "latitud"){
      setLatInput(value)
    }else if(name == "longitud"){
      setLonInput(value)
    }
    //console.log(ubiInputs)
  }

  useEffect(()=>{
    setUbiPunto({lat:latInput, lon:lonInput})
  },[lonInput, latInput])


  


  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (values) => {
    setIsLoading(true)
    const imagen = inputFileRef.current.files[0]

    const formData = new FormData();
    
    const ubiObj = {
      lat: ubiPunto.lat,
      lon: ubiPunto.lng
    };

   /*  console.log(ubiObj) */

    formData.append('nombre', values.nombre)
    formData.append('departamento', values.departamento)
    formData.append('barrio', values.barrio)
    formData.append('descripcion', descripcionPunto)
    formData.append('tipo', tipoPunto)
    formData.append('image', imagen)
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
   await fetchRegistroPunto(formData)
   setIsLoading(false)
  };

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
                       {/*  <Link to="/puntos">
                          <button
                            type="button"
                            className="btn btn-inverse-success btn-icon"
                          >
                            <i className="ti-arrow-left"></i>
                          </button>
                        </Link>{" "} */}
                        Volver
                      </h4>
                      <br />
                      <h2 className="card-title space">
                        AGREGAR NUEVO PUNTO
                        <img
                          src= { imgAgregarPunto }
                          alt="image"
                          style={{
                            width: "8vh",
                            position: "relative",
                            top: "-1vh",
                          }}
                        />
                      </h2>
                      <hr />
                    </div>
                  </div>

                  <Formik
                    enableReinitialize={true}
                    innerRef={formikRef}
                    initialValues={{
                      nombre: "",
                      departamento: "",
                      barrio: "",
                    
                    }}
                    onSubmit={handleAdd}
                    validationSchema={schemaFormPunto}
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
                                      placeholder="Por Favor, ingrese el nombre"
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
                                      <div align="center">
                                  <div class="upload-btn-wrapper">
                                    
                                    <button class="btn btn_botonIMG">Subir Foto</button>
                                    <input type="file"  ref={inputFileRef} name="myFile" onChange={(e)=>{cambiarValor(e)}}></input>
                                  </div>
                                  </div>
                                    </div> 
                                  </div>

                                  <div className="containerTabsPuntos">
                                  <div class="mb-3" align="center">
                                  <ul class="nav nav-pills" id="myTab" role="tablist" >
                                     <li class="nav-item"><a class="nav-link active" id="home-tab" data-toggle="tab" href="#home2" role="tab" aria-controls="home" aria-selected="true">Mapa</a></li>
                                     <li class="nav-item"><a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile2" role="tab" aria-controls="profile" aria-selected="false">Manual</a></li>              
                                  </ul>
                                                            </div>
                                                            <div class="tab-content mb-4">
                                                                <div class="tab-pane fade show active" id="home2" role="tabpanel" aria-labelledby="home-tab">
                                                                <MapView
                                                                    descripcionPunto= {descripcionPunto}
                                                                    imgPunto= {imgPunto}
                                                                    tipoPunto= {tipoPunto}
                                                                    
                                                                    guardarUbi = {guardarUbi}
                                                                    />
                                                                </div>
                                                                <div class="tab-pane fade" id="profile2" role="tabpanel" aria-labelledby="profile-tab">
                                                                <div className="mb-3">
                                                                  <label
                                                                          htmlFor="latitud"
                                                                          className="text-muted mb-1"
                                                                        >
                                                                          Latitud
                                                                        </label>
                                                                    <div className="content-inputs">
                                                                    <Field
                                                                          type="text"
                                                                          className="form-control form-control-sm"
                                                                          id="latitud"
                                                                          name="latitud"
                                                                          value={ubiPunto?.lat}
                                                                          onChange={(e)=>{guardarUbiInputs(e)}}
                                                                          placeholder="Por favor ingrese la latitud del punto"
                                                                        />
                                                                    </div>
                                                                  </div>
                                                                  <div className="mb-3">
                                                                  <label
                                                                          htmlFor="longitud"
                                                                          className="text-muted mb-1"
                                                                        >
                                                                          Longitud
                                                                        </label>
                                                                    <div className="content-inputs">
                                                                    <Field
                                                                          type="text"
                                                                          className="form-control form-control-sm"
                                                                          id="longitud"
                                                                          name="longitud"
                                                                          value={ubiPunto?.lng ? ubiPunto?.lng : ubiPunto?.lon}
                                                                          onChange={(e)=>{guardarUbiInputs(e)}}
                                                                          placeholder="Por favor ingrese la longitud del punto"
                                                                        />
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                
                                                            </div> 
                                  </div>                      
                                  

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
                        <button type="submit" className="btn btn-success">
                          Agregar Punto
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

RegistroDePuntos.propTypes = {
  crearPunto: PropTypes?.func?.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.puntosReducer.puntos,
});

export default connect(mapStateToProps, { fetchRegistroPunto })(
  RegistroDePuntos
);

