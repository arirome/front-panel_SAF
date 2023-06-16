
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

import PropTypes from "prop-types";
import react, {  useRef, useState } from "react";
import { connect } from "react-redux";

import MensajeErrorInput from "../../../../../Components/Layouts/Alertas/MensajeErrorInput";
import { guardarNoticia } from "../../../../../Redux/Actions/noticia.action.js"
import { mostrarNotificaciones } from "../../../../../Redux/Actions/notificaciones.action.js"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Footer from '../../../../../Components/Layouts/Footers/Footer';
import Spinner from '../../../../../Components/Layouts/Spinners/Spinner';
import Container from '../../../../../Components/Layouts/Container/Container';
import { Link } from 'react-router-dom';

const AgregarNoticias = ({ guardarNoticia, mostrarNotificaciones})  => {
    const inputFileRef= useRef()
  const [descripcionEditor, setDescripcionEditor] = useState('');
  const [previewIMG, setPreviewIMG] = useState("https://res.cloudinary.com/dabtnpikz/image/upload/v1684101476/lnYep_uu9k2n.png")

  /* const strToBool = str => {
    switch(str) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return;
    }
  }; */

  const visualizarIMG = (e) =>{
    setPreviewIMG(URL.createObjectURL(e.target.files[0]))

  }
  const handleChange = (e, editor) =>{
    setDescripcionEditor(editor.getData());
  }
  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = async (values) => {
    setIsLoading(true)
    const formData = new FormData();
    const imagen = inputFileRef.current.files[0]
   /*  const publicado = await strToBool(values.publicado)
    console.log() */
   /*  console.log(publicado) */

    formData.append('titulo', values?.titulo)
    formData.append('descripcion', descripcionEditor)
    formData.append('publicado', values.publicado)
    formData.append('image', imagen)
    console.log(formData)
   await guardarNoticia(formData)
   mostrarNotificaciones()
   setIsLoading(false)
  };

  const formikRef = useRef();
  const schemaFormNoticia = yup.object().shape({
    titulo: yup.string().required("El titulo de la noticia es requerida")
  });

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
                      <h4 className="card-title">
                        <Link to="/noticias">
                          <button
                            type="button"
                            class="btn btn-inverse-success btn-icon"
                          >
                            <i class="ti-arrow-left"></i>
                          </button>
                        </Link>{" "}
                        Volver
                      </h4>
                      <h2 className="card-title space">
                        AGREGAR NUEVA NOTICIA
                        
                      </h2>
                      <hr />
                    </div>
                  </div>
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
                        <div className="row justify-content-around">

                        <div className="col-md-6">
                            <div className="card border-0">
                              <div className="card-header pb-0"></div>
                              <div className="card-body">
                                <div class="mb-3">
                                  <div align="center" className="contenedorIMGCustom">
                                  <img className="imgPreviewCustom" src={previewIMG}/>
                                  </div>
                                  <div align="center">
                                  <div class="upload-btn-wrapper">
                                    
                                    <button class="btn btn_botonIMG">Subir Foto</button>
                                    <input ref={inputFileRef} type="file" name="myfile" onChange={(e)=>{visualizarIMG(e)}}/>
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="card border-0">
                              <div className="card-header pb-0"></div>
                              <div className="card-body">
                                <div class="mb-3">
                                  <label className="form-label">📋 Titulo De La Noticia</label>
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

                          <div className="col-md-6">
                            <div className="card border-0 ">
                              <div className="card-header pb-0">
                                <div className="card-body">

                                <div class="mb-3">
                                  <label className="form-label">
                                  📋 Escribir La Noticia
                                  </label>
                                  <div className="content-select">
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
                            Guardar Noticia
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
  )
}

AgregarNoticias.propTypes = {
    guardarNoticia: PropTypes.func.isRequired,
    mostrarNotificaciones: PropTypes.func.isRequired
  };
  

export default connect(null, {guardarNoticia, mostrarNotificaciones})(AgregarNoticias);