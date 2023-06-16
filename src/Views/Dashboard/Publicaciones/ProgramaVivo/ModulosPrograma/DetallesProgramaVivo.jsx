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
import { actualizarProgramaNF , mostrarProgramasNF} from "../../../../../Redux/Actions/programaVivo.action";

import '../StylePrograma/ModalAgregarPrograma.css'
import Spinner from "../../../../../Components/Layouts/Spinners/Spinner";

const DetallesProgramaVivo = (
  { optSmModalEditarPrograma,
    setoptSmModalEditarPrograma,
    toggleShowEditarPrograma, 
    itemPrograma,
    actualizarProgramaNF,
    mostrarProgramasNF}) => {


  const [isLoading , setIsLoading] = useState(false)

  const handleAdd = async (values) => {
    setIsLoading(true)
    const idProgramaNF = itemPrograma?.uid
    await actualizarProgramaNF(idProgramaNF, values)
    await mostrarProgramasNF()
    setIsLoading(false)
    setoptSmModalEditarPrograma();
  };

  const formikRef = useRef();
  const schemaFormPrograma = yup.object().shape({
    titulo: yup.string().required("El titulo del programa es requerido"),
    fecha: yup.date().required("La Fecha Del Programa Es Requerida"),
    videoLink: yup.string().required("El Link Del Video Es Requerido")
  });

  const fechaItem = new Date(itemPrograma?.fecha);
  const anio = fechaItem?.getFullYear();
  const mes = ("0" + (fechaItem?.getMonth() + 1)).slice(-2);
  const dia = ("0" + fechaItem?.getDate()).slice(-2);

  return (
    <MDBModal
      staticBackdrop
      stabindex="-1"
      show={optSmModalEditarPrograma}
      setShow={setoptSmModalEditarPrograma}
    >
      <MDBModalDialog scrollable style={{ marginTop: "50px", overflowY: "scroll" }}>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              <div>
                <h5
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  {itemPrograma?.titulo}
                </h5>
                <div>
                  
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
                  titulo: itemPrograma?.titulo,
                  fecha: `${anio}-${mes}-${dia}`,
                  videoLink: itemPrograma?.videoLink,
                  publicado: itemPrograma?.publicado,
                  miniaturaLink: itemPrograma?.miniaturaLink
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
                      <button
                      type="button"
                    className="btn btn-warning mx-2"
                    onClick={() => {
                      setoptSmModalEditarPrograma();
                    }}
                  >
                    Cerrar
                  </button>
                      <button type="submit"  disabled={!dirty} className="btn btn-success mx-2">
                        Editar Programa
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
 
DetallesProgramaVivo.propTypes = {
    actualizarProgramaNF: PropTypes.func.isRequired,
    mostrarProgramasNF: PropTypes.func.isRequired
};

export default connect(null, {actualizarProgramaNF, mostrarProgramasNF})(DetallesProgramaVivo);

