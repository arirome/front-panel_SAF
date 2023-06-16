import PropTypes from "prop-types";
import react, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import MensajeErrorInput from "../../../../../Components/Layouts/Alertas/MensajeErrorInput";
import imgPortada from "../../../../../Components/Assets/Images/Test2.jpg";
import { guardarProgramaNF , mostrarProgramasNF} from "../../../../../Redux/Actions/programaVivo.action";

import '../StylePrograma/ModalAgregarPrograma.css'
import Spinner from "../../../../../Components/Layouts/Spinners/Spinner";
const AgregarProgramaVivo = (
  { optSmModalNuevoPrograma,
    setoptSmModalNuevoPrograma,
    toggleShowNuevoPrograma, 
    guardarProgramaNF,
    mostrarProgramasNF}) => {


  const [isLoading , setIsLoading] = useState(false)
  const handleAdd = async (values) => {
    setIsLoading(true)
   //console.log(values)
    await guardarProgramaNF(values)
    await mostrarProgramasNF()
    setIsLoading(false)
    setoptSmModalNuevoPrograma();
  };

  const formikRef = useRef();
  const schemaFormPrograma = yup.object().shape({
    titulo: yup.string().required("El titulo del programa es requerido"),
    fecha: yup.date().required("La Fecha Del Programa Es Requerida"),
    videoLink: yup.string().required("El Link Del Video Es Requerido")
  });


  //const fechaConvertida = `${fechaActual.getFullYear()}-${fechaActual.getMonth()}-${fechaActual.getDay()}`

  const fechaActual = new Date();
const anio = fechaActual.getFullYear();
const mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
const dia = ("0" + fechaActual.getDate()).slice(-2);

  return (
    <MDBModal
      staticBackdrop
      stabindex="-1"
      show={optSmModalNuevoPrograma}
      setShow={setoptSmModalNuevoPrograma}
    >
      <MDBModalDialog scrollable style={{ marginTop: "50px", overflowY: "scroll" }}>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              <div>
                <h5
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  Subir Nuevo Programa
                </h5>
                <div>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setoptSmModalNuevoPrograma();
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </MDBModalTitle>
          </MDBModalHeader>
          <MDBModalBody>
            <div className="container">
              <Formik
                enableReinitialize={true}
                innerRef={formikRef}
                initialValues={{
                  titulo: "",
                  fecha: `${anio}-${mes}-${dia}`,
                  videoLink: "",
                  publicado: false
                }}
                onSubmit={handleAdd}
                validationSchema={schemaFormPrograma}
              >
                {({ isSubmitting, dirty }) => (
                  <Form id="formAuthentication" className="form-group">
                    <div className="justify-content-around">
                      <div>
                        <div className="card border-0">
                          <div className="card-header pb-0" align="center">
                         
                          {/*   <img
                              src={imgPortada}
                              style={{ width: "150px", height: "100px" }}
                            ></img>
                            <input type="file" /> */}
                          </div>
                          <div className="card-body">

                            <div className="mb-3">
                              <label className="form-label">
                                📋 Titulo Del Programa
                              </label>
                              <div className="content-inputs">
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="titulo"
                                  placeholder="Por favor ingrese el titulo"
                                />
                              </div>
                              <MensajeErrorInput
                                    name="titulo"
                                    className="alert alert-danger"
                               />
                            </div>

                            <div className="mb-3">
                              <label className="form-label">
                                📋 Link Del Video
                              </label>
                              <div className="content-inputs">
                              <Field
                                  type="text"
                                  className="form-control"
                                  name="videoLink"
                                  placeholder="Por favor ingrese la noticia"
                                /> 
                              </div>
                              <MensajeErrorInput
                                    name="videoLink"
                                    className="alert alert-danger"
                               />
                            </div>

                            <div className="mb-3">
                              <label className="form-label">
                                📋 Link De La Miniatura
                              </label>
                              <div className="content-inputs">
                              <Field
                                  type="text"
                                  className="form-control"
                                  name="miniaturaLink"
                                  placeholder="Por favor ingrese la noticia"
                                /> 
                              </div>
                              
                            </div>

                            <div className="mb-3">
                              <label className="form-label">
                                📋 Fecha
                              </label>
                              <div className="content-inputs">
                              <Field
                                  type="date"
                                  className="form-control"
                                  name="fecha"
                                  placeholder="Por favor ingrese la fecha del Programa"
                                  
                                /> 
                              </div>
                              <MensajeErrorInput
                                    name="fecha"
                                    className="alert alert-danger"
                               />
                            </div>

                            <div className="mb-3">
                                <div className="content-checkboxs">
                                    <div className="form-check form-check-success">
                                        <Field 
                                        className="form-check-input"  
                                        type="checkbox"
                                        name="publicado" 
                                        id="flexSwitchCheckDefault"/>
                                        <label className="form-label" for="flexSwitchCheckDefault">¿ Quiere Publicar La Noticia Ahora ?</label>
                                    </div>
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
                      <button type="submit"  disabled={!dirty} className="btn btn-success">
                        Guardar Programa
                      </button>
                    </div>
                    }
                    
                    
                  </Form>
                )}
                
              </Formik>

              
              {/*   <form  className="form-group">
                    <div className="row justify-content-around">
                      <div >
                        <div className="card border-0">
                          <div className="card-header pb-0" align="center">
                            <img src={imgPortada} style={{width:"150px", height:"100px"}}></img>
                            <input type="file"/>
                          </div>
                          <div className="card-body">

                            <div className="mb-3">
                              <label className="form-label">
                                📋 Titulo De La Noticia
                              </label>
                              <div className="content-inputs">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="titulo"
                                  
                                  placeholder="Por favor ingrese el titulo"
                                />
                              </div>
                             
                            </div>

                            <div className="mb-3">
                              <label className="form-label">
                                📋 Escribir La Noticia
                              </label>
                              <div className="content-inputs">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="descripcion"
                                  placeholder="Por favor ingrese la noticia"
                                />
                              </div>
                            </div>

                           
                          </div>
                        </div>
                      </div>
                    </div>
                    <div align="center">
                      <button type="submit" className="btn btn-success">
                        Guardar Producto
                      </button>
                      
                    </div>
                  </form> */}
            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};
 
AgregarProgramaVivo.propTypes = {
    guardarProgramaNF: PropTypes.func.isRequired,
    mostrarProgramasNF: PropTypes.func.isRequired
};

export default connect(null, {guardarProgramaNF, mostrarProgramasNF})(AgregarProgramaVivo);
