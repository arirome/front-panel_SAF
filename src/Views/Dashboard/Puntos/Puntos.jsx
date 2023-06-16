import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from '../../../Components/Layouts/Container/Container'
import Footer from '../../../Components/Layouts/Footers/Footer'
import Spinner from '../../../Components/Layouts/Spinners/Spinner'
import { Link } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Tooltip from '@mui/material/Tooltip';
import { mostrarPunto, eliminarPunto, mostrarPuntoUnico, cambiarEstadoPunto} from "../../../Redux/Actions/puntos.action"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import imagenWarningProductos from "../../../Components/Assets/Images/advertencia.png";
import VerPuntoModal from "./ModulosPuntos/VerPuntoModal";


const Puntos = ({cambiarEstadoPunto, mostrarPuntoUnico,mostrarPunto,eliminarPunto, punto: { puntos, loading } }) => {

  useEffect(() => {
    mostrarPunto();
  }, []);

  const MySwal = withReactContent(Swal);

  const buttonDelete = (id) => {
    return MySwal.fire({
      title: "¿Quieres eliminar este punto?",
      imageUrl: imagenWarningProductos,
      imageWidth: 100,
      imageHeight: 100,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPunto(id);
        Swal.fire("Eliminado!", "El archivo fue eliminado.", "success").then(
          (resultClose) => {
            //console.log(resultClose)
            mostrarPunto();
          }
        );
      }
    });
  };
  //console.log(puntos)

  const botonEstado = (id, valor) => {
    const data = {
      publicado: !valor
    }
    return MySwal.fire({
      title: valor == true ? "¿Quieres Desactivar Este Punto?" : "¿Quieres Publicar Este Punto?",
      imageUrl: imagenWarningProductos,
      imageWidth: 100,
      imageHeight: 100,
      confirmButtonColor: "#0a996f",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        cambiarEstadoPunto(id,data );
        Swal.fire("Listo!", "El Punto Fue Modificado.", "success").then(
          (resultClose) => {
            mostrarPunto()
          }
        );
      }
    });
  };

 const [optSmModalDetalles, setOptSmModalDetalles] = useState(false);
 const [datosPuntos, setDatosPuntos] = useState({})

 const toggleShowDetalles = (item) => {
   //console.log(item)
   setDatosPuntos(item);
   setOptSmModalDetalles(!optSmModalDetalles);
 };

 const [mostrarPuntosFijos, setMostrarPuntosFijos] = useState(true)
 const [mostrarPuntosVisitados, setMostrarPuntosVisitados] = useState(false)
 const [mostrarPuntosBarrio, setMostrarPuntosBarrio] = useState(false)
 const [mostrarPuntosInterior, setMostrarPuntosInterior] = useState(false)

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          {loading ? (
            <Spinner />
          ) : (
            <>
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card shadow">
                <div className="card-body">
                  <div>
                  <div className="float-right">
                      <Link to="/agregar-punto">
                        <Tooltip title="Agregar Nuevo..." className="">
                          <AddBusinessIcon>
                            <AddCircleIcon style={{ color: "#78ae62" }} />
                          </AddBusinessIcon>
                        </Tooltip>
                      </Link>
                    </div>
                  <h4 className="card-title">Puntos Fijos</h4> 
                  
                    <button className="btn btn-inverse-success btn-icon" onClick={()=>{setMostrarPuntosFijos(!mostrarPuntosFijos)}}><i className={mostrarPuntosFijos ? "ti-angle-double-up" : "ti-angle-double-down"}></i></button>
                
                  </div>
                  {
                    mostrarPuntosFijos
                    ?
                    <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-blue">
                        <tr align="center">
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Departamento</th>
                          <th>Barrio</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {puntos?.length > 0 ? (
                          <react.Fragment key="puntos">
                            {puntos?.map((punto) => {
                             /*  console.log(punto) */
                              //console.log(punto?.publicado)
                              if(punto?.tipo == "PuntoFijo"){
                                return (
                                  <react.Fragment key={punto?.uid}>
                                    <tr align="center">
                                     <td className="py-1">
                                       <img
                                         src={punto?.icono}
                                         alt="image"
                                       />
                                     </td>
                                     <td>{punto?.nombre}</td>
                                     <td>{punto?.departamento}</td>
                                     <td>{punto?.barrio}</td>
                                     <td>
                                       {
                                         punto?.publicado == true ?
                                         <a><label className="badge badge-success" onClick={()=>{botonEstado(punto?.uid, punto?.publicado)}}>Publicado</label></a>
                                         :
                                         <a><label className="badge badge-danger"onClick={()=>{botonEstado(punto?.uid, punto?.publicado)}}>No Publicado</label></a>
                                       }
                                     </td>
                                     <td>
                                       
                                         <button
                                           type="button"
                                           className="btn btn-inverse-success btn-icon"
                                           onClick={()=>{toggleShowDetalles(punto)}}
                                         >
                                           <i className="ti-eye"></i>
                                         </button>
                                 
                                       <Link to={`/editarPunto`}>
                                         <button
                                           type="button"
                                           className="btn btn-inverse-warning btn-icon mx-2"
                                           onClick={()=>{mostrarPuntoUnico(punto)}}
                                         >
                                           <i className="ti-pencil"></i>
                                         </button>
                                       </Link>
                                       <button
                                         type="button"
                                         className="btn btn-inverse-danger btn-icon"
                                         onClick={() => {
                                           buttonDelete(punto?.uid);
                                         }}
                                       >
                                         <i className="ti-trash"></i>
                                       </button>
                                     </td>
                                   </tr>
                                  </react.Fragment>
                                 );
                              }
                            })}
                          </react.Fragment>
                        ) : (
                          null
                        )}
                      </tbody>
                    </table>
                    {
                        puntos?.length > 0 ? null :
                        <div align="center">
                          <Spinner/>
                        </div>
                      }
                  </div>
                    : null
                  }
                 
                </div>
              </div>
            </div>

            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card shadow">
                <div className="card-body">
                  <div>
                  
                  <h4 className="card-title">Puntos Del Barrio</h4> <button className="btn btn-inverse-success btn-icon"  onClick={()=>{setMostrarPuntosBarrio(!mostrarPuntosBarrio)}}><i className={mostrarPuntosBarrio ? "ti-angle-double-up" : "ti-angle-double-down"}></i></button>
                  </div>
                  {
                    mostrarPuntosBarrio
                    ?
                    <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-blue">
                        <tr align="center">
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Departamento</th>
                          <th>Barrio</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {puntos?.length > 0 ? (
                          <react.Fragment key="puntos">
                            {puntos?.map((punto) => {
                              //console.log(producto)
                              //console.log(punto?.publicado)
                              if(punto?.tipo == "PuntoBarrio"){
                                return (
                                  <react.Fragment key={punto?.uid}>
                                    <tr align="center">
                                     <td className="py-1">
                                       <img
                                         src={punto?.icono}
                                         alt="image"
                                       />
                                     </td>
                                     <td>{punto?.nombre}</td>
                                     <td>{punto?.departamento}</td>
                                     <td>{punto?.barrio}</td>
                                     <td>
                                       {
                                         punto?.publicado == true ?
                                         <a><label className="badge badge-success" onClick={()=>{botonEstado(punto?.uid, punto?.publicado)}}>Publicado</label></a>
                                         :
                                         <a><label className="badge badge-danger" onClick={()=>{botonEstado(punto?.uid, punto?.publicado)}}>No Publicado</label></a>
                                       }
                                     </td>
                                     <td>
                                       
                                         <button
                                           type="button"
                                           className="btn btn-inverse-success btn-icon"
                                           onClick={()=>{toggleShowDetalles(punto)}}
                                         >
                                           <i className="ti-eye"></i>
                                         </button>
                                 
                                       <Link to={`/editarPunto`}>
                                         <button
                                           type="button"
                                           className="btn btn-inverse-warning btn-icon mx-2"
                                           onClick={()=>{mostrarPuntoUnico(punto)}}
                                         >
                                           <i className="ti-pencil"></i>
                                         </button>
                                       </Link>
                                       <button
                                         type="button"
                                         className="btn btn-inverse-danger btn-icon"
                                         onClick={() => {
                                           buttonDelete(punto?.uid);
                                         }}
                                       >
                                         <i className="ti-trash"></i>
                                       </button>
                                     </td>
                                   </tr>
                                  </react.Fragment>
                                 );
                              }
                            })}
                          </react.Fragment>
                        ) : (
                          null
                        )}
                      </tbody>
                    </table>
                    {
                        puntos?.length > 0 ? null :
                        <div align="center">
                          <Spinner/>
                        </div>
                      }
                  </div>
                    : null
                  }
                 
                </div>
              </div>
            </div>

            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card shadow">
                <div className="card-body">
                  <div>
                  
                  <h4 className="card-title">Puntos Del Interior</h4> <button className="btn btn-inverse-success btn-icon"  onClick={()=>{setMostrarPuntosInterior(!mostrarPuntosInterior)}}><i className={mostrarPuntosInterior ? "ti-angle-double-up" : "ti-angle-double-down"}></i></button>
                  </div>
                  {
                    mostrarPuntosInterior
                    ?
                    <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-blue">
                        <tr align="center">
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Departamento</th>
                          <th>Barrio</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {puntos?.length > 0 ? (
                          <react.Fragment key="puntos">
                            {puntos?.map((punto) => {
                              //console.log(producto)
                              //console.log(punto?.publicado)
                              if(punto?.tipo == "PuntoInterior"){
                                return (
                                  <react.Fragment key={punto?.uid}>
                                    <tr align="center">
                                     <td className="py-1">
                                       <img
                                         src={punto?.icono}
                                         alt="image"
                                       />
                                     </td>
                                     <td>{punto?.nombre}</td>
                                     <td>{punto?.departamento}</td>
                                     <td>{punto?.barrio}</td>
                                     <td>
                                       {
                                         punto?.publicado == true ?
                                         <a><label className="badge badge-success" onClick={()=>{botonEstado(punto?.uid, punto?.publicado)}}>Publicado</label></a>
                                         :
                                         <a><label className="badge badge-danger" onClick={()=>{botonEstado(punto?.uid, punto?.publicado)}}>No Publicado</label></a>
                                       }
                                     </td>
                                     <td>
                                       
                                         <button
                                           type="button"
                                           className="btn btn-inverse-success btn-icon"
                                           onClick={()=>{toggleShowDetalles(punto)}}
                                         >
                                           <i className="ti-eye"></i>
                                         </button>
                                 
                                       <Link to={`/editarPunto`}>
                                         <button
                                           type="button"
                                           className="btn btn-inverse-warning btn-icon mx-2"
                                           onClick={()=>{mostrarPuntoUnico(punto)}}
                                         >
                                           <i className="ti-pencil"></i>
                                         </button>
                                       </Link>
                                       <button
                                         type="button"
                                         className="btn btn-inverse-danger btn-icon"
                                         onClick={() => {
                                           buttonDelete(punto?.uid);
                                         }}
                                       >
                                         <i className="ti-trash"></i>
                                       </button>
                                     </td>
                                   </tr>
                                  </react.Fragment>
                                 );
                              }
                            })}
                          </react.Fragment>
                        ) : (
                          null
                        )}
                      </tbody>
                    </table>
                    {
                        puntos?.length > 0 ? null :
                        <div align="center">
                          <Spinner/>
                        </div>
                      }
                  </div>
                    : null
                  }
                 
                </div>
              </div>
            </div>

            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card shadow">
                <div className="card-body">
                  <div>
                  
                  <h4 className="card-title">Puntos Visitados</h4> <button className="btn btn-inverse-success btn-icon"  onClick={()=>{setMostrarPuntosVisitados(!mostrarPuntosVisitados)}}><i className={mostrarPuntosVisitados ? "ti-angle-double-up" : "ti-angle-double-down"}></i></button>
                  </div>
                  {
                    mostrarPuntosVisitados
                    ?
                    <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-blue">
                        <tr align="center">
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Departamento</th>
                          <th>Barrio</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {puntos?.length > 0 ? (
                          <react.Fragment key="puntos">
                            {puntos?.map((punto) => {
                              //console.log(producto)
                              //console.log(punto?.publicado)
                              if(punto?.tipo == "PuntoVisitado"){
                                return (
                                  <react.Fragment key={punto?.uid}>
                                    <tr align="center">
                                     <td className="py-1">
                                       <img
                                         src={punto?.icono}
                                         alt="image"
                                       />
                                     </td>
                                     <td>{punto?.nombre}</td>
                                     <td>{punto?.departamento}</td>
                                     <td>{punto?.barrio}</td>
                                     <td>
                                       {
                                         punto?.publicado == true ?
                                         <a><label className="badge badge-success" onClick={()=>{botonEstado(punto?.uid, punto?.publicado)}}>Publicado</label></a>
                                         :
                                         <a><label className="badge badge-danger" onClick={()=>{botonEstado(punto?.uid, punto?.publicado)}}>No Publicado</label></a>
                                       }
                                     </td>
                                     <td>
                                       
                                         <button
                                           type="button"
                                           className="btn btn-inverse-success btn-icon"
                                           onClick={()=>{toggleShowDetalles(punto)}}
                                         >
                                           <i className="ti-eye"></i>
                                         </button>
                                 
                                       <Link to={`/editarPunto`}>
                                         <button
                                           type="button"
                                           className="btn btn-inverse-warning btn-icon mx-2"
                                           onClick={()=>{mostrarPuntoUnico(punto)}}
                                         >
                                           <i className="ti-pencil"></i>
                                         </button>
                                       </Link>
                                       <button
                                         type="button"
                                         className="btn btn-inverse-danger btn-icon"
                                         onClick={() => {
                                           buttonDelete(punto?.uid);
                                         }}
                                       >
                                         <i className="ti-trash"></i>
                                       </button>
                                     </td>
                                   </tr>
                                  </react.Fragment>
                                 );
                              }
                            })}
                          </react.Fragment>
                        ) : (
                          null
                        )}
                      </tbody>
                    </table>
                    {
                        puntos?.length > 0 ? null :
                        <div align="center">
                          <Spinner/>
                        </div>
                      }
                  </div>
                    : null
                  }
                 
                </div>
              </div>
            </div>
            </>
          )}

          <VerPuntoModal
            item={datosPuntos}
            optSmModalDetalles={optSmModalDetalles}
            setOptSmModalDetalles={setOptSmModalDetalles}
            toggleShowDetalles={toggleShowDetalles}
          />

        </div>
        <Footer />
       
      </div>



    </Container>
  )
}

Puntos.propTypes = {
  mostrarPunto: PropTypes.func.isRequired,
  mostrarPuntoUnico: PropTypes.func.isRequired,
  puntos: PropTypes.object.isRequired,
  cambiarEstadoPunto: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  punto: state.puntosReducer,
});

export default connect(mapStateToProps, { mostrarPunto, eliminarPunto, mostrarPuntoUnico, cambiarEstadoPunto })(Puntos);