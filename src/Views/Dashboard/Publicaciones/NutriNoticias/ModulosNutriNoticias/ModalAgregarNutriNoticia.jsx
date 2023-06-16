import PropTypes from "prop-types";
import react, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import '../StyleNoticias/ModalAgregar.css'
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
import { guardarNutriNoticia } from "../../../../../Redux/Actions/nutriNoticia.action"
import { mostrarNotificaciones } from "../../../../../Redux/Actions/notificaciones.action.js"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ModalAgregarNutriNoticia = (
  {optSmModalNuevaNoticia,
    setoptSmModalNuevaNoticia,
    toggleShowNuevaNoticia, 
    guardarNutriNoticia, 
    mostrarNotificaciones}) => {
 
  const [descripcionEditor, setDescripcionEditor] = useState('');

  const handleChange = (e, editor) =>{
    setDescripcionEditor(editor.getData());
  }

  const handleAdd = async (values) => {
    //console.log(values);
    const data = {
      titulo:values.titulo,
      descripcion: descripcionEditor,
      publicado: values.publicado
    }
   // console.log(descripcionEditor)
   await guardarNutriNoticia(data)
   mostrarNotificaciones()
  };

  const formikRef = useRef();
  const schemaFormNoticia = yup.object().shape({
    titulo: yup.string().required("El titulo de la noticia es requerida")
  });

  return (
    <MDBModal
      staticBackdrop
      stabindex="-1"
      show={optSmModalNuevaNoticia}
      setShow={setoptSmModalNuevaNoticia}
    >
      <MDBModalDialog scrollable style={{ marginTop: "50px", overflowY: "scroll" }}>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              <div>
                <h5
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  Subir Nueva Noticia
                </h5>
                <div>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setoptSmModalNuevaNoticia();
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
                  titulo: " ",
                  publicado: false
                }}
                onSubmit={handleAdd}
                validationSchema={schemaFormNoticia}
              >
                {({ isSubmitting, dirty }) => (
                  <Form id="formAuthentication" className="form-group">
                    <div className="justify-content-around">
                      <div>
                        <div className="card border-0">
                          <div className="card-header pb-0" align="center">
                            <img
                              src={imgPortada}
                              style={{ width: "150px", height: "100px" }}
                            ></img>
                            <input type="file" />
                          </div>
                          <div className="card-body">
                            <div className="mb-3">
                              <label className="form-label">
                                📋 Titulo De La Noticia
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
                                📋 Escribir La Noticia
                              </label>
                              <div className="content-inputs">
                                {/* <Field
                                  type="text"
                                  className="form-control"
                                  name="descripcion"
                                  placeholder="Por favor ingrese la noticia"
                                /> */}
                                <CKEditor
                                editor={ ClassicEditor }
                                placeholder="Ingresar la Noticia..."
                                data=" "
                                onChange={(e,editor) =>{ handleChange(e,editor)}}
                              />
                              </div>
                              <MensajeErrorInput
                                    name="descripcion"
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
                    
                    <div align="center">
                      <button type="submit"  disabled={!dirty} className="btn btn-success">
                        Guardar Noticia
                      </button>
                    </div>
                    
                  </Form>
                )}
                
              </Formik>

            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};
 
ModalAgregarNutriNoticia.propTypes = {
  guardarNutriNoticia: PropTypes.func.isRequired,
  mostrarNotificaciones: PropTypes.func.isRequired
};

export default connect(null, {guardarNutriNoticia, mostrarNotificaciones})(ModalAgregarNutriNoticia);

