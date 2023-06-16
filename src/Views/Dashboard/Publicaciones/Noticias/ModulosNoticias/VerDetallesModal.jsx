import PropTypes from "prop-types";
import react, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
/* import imgPortada from "../../../../../Components/Assets/Images/Test2.jpg"; */
import MensajeErrorInput from "../../../../../Components/Layouts/Alertas/MensajeErrorInput";
import {
  actualizarNoticia,
  mostrarNoticias,
} from "../../../../../Redux/Actions/noticia.action";
const VerDetallesModal = ({
  optSmModalDetalles,
  setOptSmModalDetalles,
  toggleShowDetalles,
  item,
  actualizarNoticia,
  mostrarNoticias,
}) => {
  //console.log(item)

  const [fechaFormato, setFechaFormato] = useState();
  const [idItem, setIdItem] = useState();
  const [tituloItem, setTitutoItem] = useState();
  const [descripcionItem, setDescripcionItem] = useState();
  const [publicadoItem, setPublicadoItem] = useState();
  const [imagenPortada, setImagenPortada] = useState();
  const inputFileRef = useRef();
  useEffect(() => {
    if (item?.updatedAt) {
      const fecha = new Date(item?.updatedAt);
      setFechaFormato(fecha.toLocaleDateString());
    } else {
      setFechaFormato("---");
    }
  }, [item]);

  const [modoEditar, setModoEditar] = useState(false);
  const vistaEditar = () => {
    //console.log(item?.img)
    setModoEditar(true);
    setTitutoItem(item?.titulo);
    setDescripcionItem(item?.descripcion);
    setPublicadoItem(item?.publicado);
    setIdItem(item?.uid);
    setImagenPortada(item?.img);
  };

  const visualizarIMG = (e) => {
    setImagenPortada(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e, valor) => {
    setDescripcionItem(valor.getData());
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = async (values) => {
    setIsLoading(true)
    const formData = new FormData();
    const imagen = inputFileRef.current.files[0]

    /* if(imagen){
      console.log("existe")
    }else{
      console.log("No Existe")
    } */

    formData.append('titulo', values?.titulo)
    formData.append('descripcion', descripcionItem)
    formData.append('publicado', values.publicado)
    formData.append('image', imagen ? imagen : imagenPortada)
    /* const data = {
      titulo: values.titulo,
      descripcion: descripcionItem,
      publicado: values.publicado,
    }; */
   // await actualizarNoticia(idItem, formData);
    console.log(formData);
    /* setModoEditar(false); */
    //mostrarNoticias()
    setIsLoading(false)
  };

  const formikRef = useRef();
  const schemaFormNoticia = yup.object().shape({
    titulo: yup.string().required("El titulo de la noticia es requerida"),
  });

  const cerrarModal = () => {
    setDescripcionItem("");
    setTitutoItem("");
    setPublicadoItem("");
    setModoEditar(false);
    setOptSmModalDetalles();
  };

  return (
    <MDBModal
      staticBackdrop
      stabindex="-1"
      show={optSmModalDetalles}
      setShow={setOptSmModalDetalles}
    >
      <MDBModalDialog
        scrollable
        style={{ marginTop: "50px", overflowY: "scroll" }}
      >
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              <div>
                <h5
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  {item?.titulo}
                </h5>
              </div>
            </MDBModalTitle>
          </MDBModalHeader>
          <MDBModalBody>
            {modoEditar ? (
              <div className="container">
                <Formik
                  enableReinitialize={true}
                  innerRef={formikRef}
                  initialValues={{
                    titulo: tituloItem,
                    publicado: publicadoItem,
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
                                src={imagenPortada}
                                style={{ width: "150px", height: "100px",  borderRadius:"10px" }}
                              ></img>
                            </div>
                            <div align="center" style={{ marginTop: "15px" }}>
                              <div class="upload-btn-wrapper">
                                <button class="btn btn_botonIMG">
                                  Subir Foto
                                </button>
                                <input
                                  ref={inputFileRef}
                                  type="file"
                                  name="myfile"
                                  onChange={(e) => {
                                    visualizarIMG(e);
                                  }}
                                />
                              </div>
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
                                    editor={ClassicEditor}
                                    placeholder="Ingresar la Noticia..."
                                    data={descripcionItem}
                                    onChange={(e, editor) => {
                                      handleChange(e, editor);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="mb-3">
                                <div className="content-checkboxs">
                                  <div className="form-check form-check-success">
                                    <Field
                                      className="form-check-input"
                                      type="checkbox"
                                      name="publicado"
                                      id="flexSwitchCheckDefault"
                                    />
                                    <label
                                      className="form-label"
                                      for="flexSwitchCheckDefault"
                                    >
                                      ¿ Quiere Publicar La Noticia Ahora ?
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-5">
                        <button
                          className="btn btn-warning mx-2"
                          onClick={() => {
                            cerrarModal();
                          }}
                        >
                          Cerrar
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success mx-2"
                          disabled={!dirty}
                        >
                          Guardar
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            ) : (
              <div className="container">
                <div  align="center" style={{marginBottom:"10px"}}>
                  <img
                    src={item?.img}
                    style={{ width: "150px", height: "100px", borderRadius:"10px"}}
                  ></img>
                </div>
                <div>
                  <h4>Titulo:</h4>
                  <p>{item?.titulo}</p>
                </div>
                <hr />
                <div>
                  <h4>Descripcion:</h4>
                  {item ? (
                    <p>{parse(item?.descripcion.substring(0, 400))}</p>
                  ) : null}
                </div>

                <hr className="new1" />
                <div className="mb-3">
                  {item?.publicado == true ? (
                    <label className="badge badge-success">Publicado</label>
                  ) : (
                    <label className="badge badge-danger">No Publicado</label>
                  )}
                </div>
                <hr />

                <div className="text-right">
                  <span className="theme-color" style={{ fontSize: "12px" }}>
                    Ultima Actualización: {fechaFormato}
                  </span>
                </div>
                <div className="text-center mt-5">
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => {
                      cerrarModal();
                    }}
                  >
                    Cerrar
                  </button>
                  <button
                    className="btn btn-info mx-2"
                    onClick={() => {
                      vistaEditar();
                    }}
                  >
                    Editar
                  </button>
                </div>
              </div>
            )}
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

VerDetallesModal.propTypes = {
  actualizarNoticia: PropTypes.func.isRequired,
  mostrarNoticias: PropTypes.func.isRequired,
};

export default connect(null, { actualizarNoticia, mostrarNoticias })(
  VerDetallesModal
);
