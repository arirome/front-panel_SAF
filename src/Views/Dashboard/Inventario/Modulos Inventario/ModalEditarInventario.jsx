import PropTypes from "prop-types";
import react, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import MensajeErrorInput from "../../../../Components/Layouts/Alertas/MensajeErrorInput"
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import {mostrarPunto} from '../../../../Redux/Actions/puntos.action.js'
import { actualizarInventario } from '../../../../Redux/Actions/inventario.action.js'
import './Style Inventario/EditarModal.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';

import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";

const ModalEditarInventario = ({item, datosInventario, datosPosicion, mostrarPunto, punto: { puntos },actualizarInventario,  optSmModalEditar, setOptSmModalEditar, toggleShowEditar,}) => {

  const [datosProducto, setDatosProducto] = useState({})

  useEffect(()=>{
    setDatosProducto(item)
    //console.log("Se Activa")
    mostrarPunto()
  },[item])



  const formikRef = useRef();
  const schemaFormProducto = yup.object().shape({
    nombre_producto: yup.string().required("El nombre del producto es requerido"),
    cantidad_producto: yup.number("Ingresar un numero valido").required("La cantidad del producto es requerida"),
    precio_producto: yup.number("Ingresar un numero valido").required("El precio del producto es requerido"),
    unidad_producto: yup.string().required("Seleccionar el tipo de unidad"),
    destino_producto: yup.string().required("Seleccionar el destino"),
  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
        nombre_producto,
        cantidad_producto,
        precio_producto,
        unidad_producto,
        destino_producto
    } = values;

    //console.log(values)

    actualizarInventario({
      producto:{
        nombre: nombre_producto,
        unidad: unidad_producto,
        cantidadProducto: cantidad_producto,
        precio: precio_producto,
        destino: destino_producto
      },
      idProducto:{
        id: datosProducto?._id
      },
      idInventario:{
        idInventario: datosInventario?.uid
      }
    })
    
  };

  return (
  <div className="container">
  <MDBModal
    staticBackdrop
    stabindex="-1"
    show={optSmModalEditar}
    setShow={setOptSmModalEditar}
  >
    <MDBModalDialog style={{marginTop:"10px", overflowY: "scroll"}} >
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>
            <div>
              <h5>Editar</h5>
            </div>
          </MDBModalTitle>
          
        </MDBModalHeader>
        <MDBModalBody>
        <div>
           <Formik
           enableReinitialize={true}
           innerRef={formikRef}
           initialValues={{
            nombre_producto: datosProducto?.nombre,
            cantidad_producto: datosProducto?.cantidadProducto,
            precio_producto: datosProducto?.precio,
            unidad_producto: datosProducto?.unidad,
            destino_producto: datosProducto?.destino?._id
           }}
           onSubmit={handleSubmit}
           validationSchema={schemaFormProducto}
           >
            {({ isSubmitting, dirty }) => (
                    <Form id="formAuthentication" className="form-group">
                      <div className="mb-3">
                        <label  className="form-label">
                        📋 Nombre Del Producto
                        </label>
                        <div className="content-inputs">
                        <Field
                          type="text"
                          className="form-control"
                          id="nombre_producto"
                          name="nombre_producto"
                          placeholder="Por favor ingrese el nombre del producto"
                          
                        />
                        </div>
                        {/* <div id="emailHelp" className="form-text">
                          Agregar el nombre correcto
                        </div> */}
                      </div>
                      <MensajeErrorInput
                        name="nombre_producto"
                        className="alert alert-danger"
                      />

                      <div className="mb-3">
                        <label className="form-label">
                        📋Seleccionar Unidad
                        </label>
                        <div className="content-select">
                        <Field
                            as="select"
                            className="form-select"
                            id="unidad_producto"
                            name="unidad_producto"
                            // defaultValue = ""
                          >
                            <option disabled value="">Lista De Unidades</option>
                            <option value="KG" >🔸KG</option>
                            <option value="Litros" >🔸Litros</option>
                            <option value="UN" >🔸UN</option>
                        </Field>
                        </div>
                      </div>
                      <MensajeErrorInput
                        name="unidad_producto"
                        className="alert alert-danger"
                      />

                      <div className="mb-3">
                        <label className="form-label">
                        📦 Cantidad Del Producto
                        </label>
                        <div className="content-inputs">
                        <Field
                          type="number"
                          className="form-control"
                          id="cantidad_producto"
                          name="cantidad_producto"
                          placeholder="Por favor ingrese la cantidad del producto"
                        />
                        </div>
                      </div>
                      <MensajeErrorInput
                        name="cantidad_producto"
                        className="alert alert-danger"
                      />

                      <div className="mb-3">
                        <label className="form-label">
                        💲Precio Del Producto
                        </label>
                        <div className="content-inputs">
                        <Field
                          type="number"
                          className="form-control"
                          id="precio_producto"
                          name="precio_producto"
                          placeholder="Por favor ingrese el precio del producto"
                        />
                        </div>
                      </div>
                      <MensajeErrorInput
                        name="precio_producto"
                        className="alert alert-danger"
                      />

                        <div className="mb-3">
                        <label className="form-label">
                        🌍 Seleccionar Destino
                        </label>
                        <div className="content-select">
                        <Field
                            as="select"
                            className="form-select"
                            id="destino_producto"
                            name="destino_producto"
                            // defaultValue = ""
                          >
                            <option disabled value="">Lista De Destinos</option>
                            {
                              puntos?.map((item)=>{
                                return(
                                  <option key={`${item?.uid}-punto`} value={item?.uid} >🔹{item?.nombre} ({item?.barrio})</option>
                                )
                              })
                            }
                        </Field>
                        </div>
                        
                      </div>
                      <MensajeErrorInput
                        name="destino_producto"
                        className="alert alert-danger"
                      />

                    <div align="center">
                    <button type="button" className="btn btn-danger mx-2" onClick={() => {setOptSmModalEditar()}}>
                        Cerrar
                      </button>
                    <button type="submit" disabled={!dirty} className="btn btn-success">
                        Editar Producto
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
  </div>
  );
};


ModalEditarInventario.propTypes = {
  puntos: PropTypes.object.isRequired,
  mostrarPunto: PropTypes.func.isRequired,
  actualizarInventario: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  punto: state.puntosReducer,
});

export default connect(mapStateToProps, {
  mostrarPunto,actualizarInventario,
})(ModalEditarInventario);
