import React, { useEffect, useState, useRef } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import "./Style Inventario/AgregarInventario.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  crearInventario,
  limpiarInventario,
} from "../../../../Redux/Actions/inventario.action";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { mostrarPunto } from "../../../../Redux/Actions/puntos.action.js";
import { mostrarProductos } from "../../../../Redux/Actions/productos.action.js"
import { Link, Redirect, useHistory } from "react-router-dom";
import MensajeErrorInput from "../../../../Components/Layouts/Alertas/MensajeErrorInput";

const AgregarInventario = ({
  crearInventario,
  limpiarInventario,
  mostrarPunto,
  mostrarProductos,
  producto: {productos, totalProductos},
  punto: { puntos },
}) => {
  useEffect(() => {
    mostrarPunto();
    /* console.log(totalProductos) */
    mostrarProductos(38, 0)
  }, []);

 

 /*  useEffect(()=>{
    console.log(productos)
  },[productos]) */

  const [cantidadList, setCantidadList] = useState([
    /* {
      nombre: "Test",
      unidad: "KG",
      cantidadProducto: 20,
      precio: 100,
      destino: "635ab7536abc9ecc0518bf37",
      img: "https://images.vexels.com/media/users/3/199820/isolated/preview/892bfdfcb80b356c53405aafbb716513-caja-de-carton-isometrica.png",
    }, */
  ]);

  const [inventarioEnviado, setInventarioEnviado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [destino, setDestino] = useState("");
  const [imgProducto, setImgProducto] = useState(
    "https://images.vexels.com/media/users/3/199820/isolated/preview/892bfdfcb80b356c53405aafbb716513-caja-de-carton-isometrica.png"
  );
  const [sumarTotal, setSumarTotal] = useState(0);

  const handleAdd = (values) => {

    const {
      nombre_producto,
      cantidad_producto,
      precio_producto,
      unidad_producto,
      destino_producto,
    } = values;

    setPrecio(precio_producto)
    //console.log(values);

    setCantidadList([
      ...cantidadList,
      {
        nombre: nombre_producto,
        unidad: unidad_producto,
        cantidadProducto: cantidad_producto,
        precio: precio_producto,
        destino: destino_producto,
        img: imgProducto,
      },
    ]);
    setSumarTotal(sumarTotal + parseInt(precio_producto));
    /* setCantidadList([...cantidadList, { nombre: "", apellido: "" }]); */
  };

  const handleEliminar = (index) => {
 /*    console.log(index) */
    const list = [...cantidadList];
   /*  console.log(cantidadList) */
    setSumarTotal(sumarTotal - parseInt(list[index].precio));
    list.splice(index, 1);
    setCantidadList(list);
  };

  //const history = useHistory()



  const confirmarStock = () => {
    crearInventario({
      productos: cantidadList,
    });
    //history.goBack()
  };

  /*  useEffect(()=>{
    limpiarInventario()
  },[]) */

  const formikRef = useRef();
  const schemaFormInventario = yup.object().shape({
    nombre_producto: yup
      .string()
      .required("El nombre del producto es requerido"),
    cantidad_producto: yup
      .number("Ingresar un numero valido")
      .required("La cantidad del producto es requerida"),
    precio_producto: yup
      .number("Ingresar un numero valido")
      .required("El precio del producto es requerido"),
    unidad_producto: yup.string().required("Seleccionar el tipo de unidad"),
    destino_producto: yup.string().required("Seleccionar el destino"),
  });

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className=" container-fluid  ">
            <div className="row justify-content-center ">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card shadow-lg ">
                  <div className="row  mx-auto justify-content-center text-center">
                    <div className="col-12 mt-3 ">
                      <h2 className="card-title space">
                        AGREGAR NUEVO INVENTARIO
                      </h2>
                    </div>
                  </div>

                  <div className="row justify-content-around">
                    <div className="col-md-5">
                      <div className="card border-0">
                        <div className="card-header pb-0">
                          <h2 className="card-title space ">
                            <Link to="/inventario">
                              <button
                                type="button"
                                class="btn btn-inverse-success btn-icon"
                              >
                                <i class="ti-arrow-left"></i>
                              </button>
                            </Link>{" "}
                            Nuevo Producto
                          </h2>
                          <p className="card-text text-muted mt-4  space">
                            Formulario Del Producto
                          </p>
                          <hr className="my-0" />
                        </div>
                        <div className="card-body">
                          <Formik
                            enableReinitialize={true}
                            innerRef={formikRef}
                            initialValues={{
                              nombre_producto: " ",
                              cantidad_producto: 0,
                              precio_producto: 0,
                              unidad_producto: " ",
                              destino_producto: " ",
                            }}
                            onSubmit={handleAdd}
                            validationSchema={schemaFormInventario}
                          >
                            {({ isSubmitting, dirty }) => (
                              <Form
                                id="formAuthentication"
                                className="form-group"
                              >
                                <div className="row no-gutters">
                                  <div className="col-sm-6 pr-sm-2">
                                    <div className="form-group">
                                      <label
                                        for="distribuidores"
                                        className="small text-muted mb-1"
                                      >
                                        Lista De Distribuidores
                                      </label>
                                      <Field
                                        className="form-control form-control-sm"
                                        as="select"
                                        id="distribuidores"
                                        name="distribuidores"
                                        defaultValue=" "
                                      >
                                        <option disabled value=" ">
                                          Lista De Distribuidores
                                        </option>
                                        <option value="KG">KG</option>
                                        <option value="Litros">Litros</option>
                                        <option value="UN">UN</option>
                                      </Field>
                                      
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                  <div className="form-group">
                                      <label
                                        for="nombre_producto"
                                        className="small text-muted mb-1"
                                      >
                                        Lista De Productos
                                      </label>
                                      <Field
                                        className="form-control form-control-sm"
                                        as="select"
                                        id="nombre_producto"
                                        name="nombre_producto"
                                        defaultValue=" "
                                      >
                                        <option disabled value=" ">
                                          Lista De Productos
                                        </option>
                                       
                                         {productos?.map((item) => {
                                          //console.log(productos)
                                         return (
                                          <option
                                            key={`${item?.uid}-producto`}
                                            value={item?.uid}
                                          >
                                            {item?.nombre}
                                          </option>
                                        );
                                        })} 
                                      </Field>
                                      
                                    </div>
                                    <MensajeErrorInput
                                      name="nombre_producto"
                                      className="alert alert-danger"
                                    />
                                  </div>
                                </div>

                                <div className="row no-gutters">
                                  <div className="col-sm-6 pr-sm-2">
                                    <div className="form-group">
                                      <label
                                        for="unidad_producto"
                                        className="small text-muted mb-1"
                                      >
                                        Unidad Del Producto
                                      </label>
                                      <Field
                                        className="form-control form-control-sm"
                                        as="select"
                                        id="unidad_producto"
                                        name="unidad_producto"
                                      >
                                        <option disabled value=" ">
                                          Lista De Unidades
                                        </option>
                                        <option value="KG">KG</option>
                                        <option value="Litros">Litros</option>
                                        <option value="UN">UN</option>
                                      </Field>
                                      <MensajeErrorInput
                                        name="unidad_producto"
                                        className="alert alert-danger"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label
                                        for="cantidad_producto"
                                        className="small text-muted mb-1"
                                      >
                                        Cantidad Total Del Producto
                                      </label>

                                      <Field
                                        className="form-control form-control-sm"
                                        type="number"
                                        id="cantidad_producto"
                                        name="cantidad_producto"
                                        placeholder="Por favor ingrese la cantidad del producto"
                                      />
                                    </div>
                                    <MensajeErrorInput
                                      name="cantidad_producto"
                                      className="alert alert-danger"
                                    />
                                  </div>
                                </div>

                                <div className="row no-gutters">
                                  <div className="col-sm-6 pr-sm-2">
                                    <div className="form-group">
                                      <label
                                        for="precio_producto"
                                        className="small text-muted mb-1"
                                      >
                                        Precio Total
                                      </label>
                                      <Field
                                        type="number"
                                        className="form-control form-control-sm"
                                        id="precio_producto"
                                        name="precio_producto"
                                        placeholder="Por favor ingrese el precio del producto"
                                      />
                                    </div>
                                    <MensajeErrorInput
                                      name="precio_producto"
                                      className="alert alert-danger"
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label
                                        for="destino_producto"
                                        className="small text-muted mb-1"
                                      >
                                        Destino
                                      </label>
                                      <Field
                                        className="form-control form-control-sm"
                                        as="select"
                                        id="destino_producto"
                                        name="destino_producto"
                                      >
                                        <option disabled value=" ">
                                          Seleccionar Destino
                                        </option>
                                        {puntos?.map((item) => {
                                          if(item?.tipo == "PuntoFijo"){
                                            return (
                                              <option
                                                key={`${item?.uid}-punto`}
                                                value={item?.uid}
                                              >
                                                {item?.nombre} ({item?.barrio})
                                              </option>
                                            );
                                          }
                                        })}
                                      </Field>
                                    </div>
                                    <MensajeErrorInput
                                      name="destino_producto"
                                      className="alert alert-danger"
                                    />
                                  </div>
                                </div>
                                <div className="row mb-md-5">
                                  <div className="col mx-5" align="center">
                                    <button
                                      type="submit"
                                      disabled={!dirty}
                                      name=""
                                      id=""
                                      className="btn btn-info"
                                    >
                                      Agregar a la lista
                                    </button>
                                  </div>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="card border-0 ">
                        <div className="card-header card-2">
                          <p className="card-text text-muted mt-md-4  mb-2 space">
                            Tus Productos a enviar{" "}
                          </p>
                          <hr className="my-2" />
                        </div>
                        <div className="card-body pt-0">
                          {cantidadList.length > 0 ? (
                            <>
                              {cantidadList.map((data, i) => {

                                var destinoDescripcion

                                for (var e = 0; e < puntos?.length; e++) {
                                  //console.log("nro", i , data.nombre)
                                  if (data.destino === puntos[e]?.uid) {
                                    destinoDescripcion = puntos[e]?.nombre;
                                    
                                  }
                                }

                                return (
                                  <React.Fragment key={i}>
                                    <div className="row  justify-content-between">
                                      <div className="col-auto col-md-7">
                                        <div className="media flex-column flex-sm-row">
                                          <img
                                            className=" img-fluid"
                                            src={data.img}
                                            width="62"
                                            height="62"
                                          />
                                          <div className="media-body  my-auto">
                                            <div className="row ">
                                              <div className="col-auto">
                                                <p className="mb-0">
                                                  <b>{data.nombre}</b>
                                                </p>
                                                <small className="text-muted">
                                                  {data.cantidadProducto}{" "}
                                                  {data.unidad}
                                                </small>
                                                <br />
                                                <small className="text-muted">
                                                  Destino: <strong>{destinoDescripcion}</strong>
                                                </small>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className=" pl-0 flex-sm-col col-auto  my-auto">
                                        {" "}
                                        <p className="boxed-1">
                                          ${data.precio}
                                        </p>
                                      </div>
                                      <div className=" pl-0 flex-sm-col col-auto  my-auto ">
                                        <Tooltip title="Eliminar" className="">
                                          <IconButton>
                                            <DeleteIcon
                                              style={{ color: "red" }}
                                              onClick={() => {
                                                handleEliminar(i);
                                              }}
                                            />
                                          </IconButton>
                                        </Tooltip>
                                      </div>
                                    </div>
                                    <hr className="my-2" />
                                  </React.Fragment>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <React.Fragment>
                                <div className="row  justify-content-between">
                                  <div className="col-auto col-md-7">
                                    <div className="media flex-column flex-sm-row">
                                      <img
                                        className=" img-fluid"
                                        src="https://cdn-icons-png.flaticon.com/512/6836/6836858.png"
                                        width="62"
                                        height="62"
                                      />
                                      <div className="media-body  my-auto">
                                        <div className="row ">
                                          <div className="col-auto">
                                            <p className="mb-0">
                                              <b>Pruducto</b>
                                            </p>
                                            <small className="text-muted">
                                              100 KG
                                            </small>
                                            <br />
                                            <small className="text-muted">
                                              Destino: 635ab7536abc9ecc0518bf37
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" pl-0 flex-sm-col col-auto  my-auto">
                                    {" "}
                                    <p className="boxed-1">$0,00</p>
                                  </div>
                                  <div className=" pl-0 flex-sm-col col-auto  my-auto ">
                                    <Tooltip title="Eliminar" className="">
                                      <IconButton>
                                        <DeleteIcon
                                          style={{ color: "white" }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </div>
                                </div>
                                <hr className="my-2" />
                              </React.Fragment>
                            </>
                          )}
                          <div className="row ">
                            <div className="col">
                              <div className="row justify-content-between">
                                <div className="col-4">
                                  <p className="mb-1">
                                    <b>Total:</b>
                                  </p>
                                </div>
                                <div className="flex-sm-col col-auto">
                                  <p className="mb-1">
                                    <b>
                                      ${" "}
                                      {cantidadList.length > 0
                                        ? sumarTotal
                                        : "0,00"}
                                    </b>
                                  </p>
                                </div>
                              </div>
                              {/*   <div className="row justify-content-between">
                                                                <div className="col"><p className="mb-1"><b>Shipping</b></p></div>
                                                                <div className="flex-sm-col col-auto"><p className="mb-1"><b>0 SEK</b></p></div>
                                                            </div>
                                                            <div className="row justify-content-between">
                                                                <div className="col-4"><p ><b>Total</b></p></div>
                                                                <div className="flex-sm-col col-auto"><p className="mb-1"><b>537 SEK</b></p> </div>
                                                            </div> */}
                              <hr className="my-0" />
                            </div>
                          </div>
                          <div className="row mb-5 mt-4 ">
                            <div className="mx-auto">
                              {cantidadList.length > 0 ? (
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => {
                                    confirmarStock();
                                  }}
                                >
                                  Guardar y Enviar
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  disabled
                                  className="btn btn-success"
                                >
                                  Guardar y Enviar
                                </button>
                              )}
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
        </div>
        <Footer />
      </div>
    </Container>
  );
};

AgregarInventario.propTypes = {
  crearInventario: PropTypes.func.isRequired,
  limpiarInventario: PropTypes.func.isRequired,
  mostrarPunto: PropTypes.func.isRequired,
  puntos: PropTypes.object.isRequired,
  mostrarProductos: PropTypes.func.isRequired,
  productos: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  punto: state.puntosReducer,
  producto: state.productosReducer
});

export default connect(mapStateToProps, { mostrarProductos, crearInventario, mostrarPunto, limpiarInventario })(
  AgregarInventario
);
