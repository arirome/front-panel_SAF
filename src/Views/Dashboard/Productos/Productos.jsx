import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "../../../Components/Layouts/Container/Container";
import Footer from "../../../Components/Layouts/Footers/Footer";
import Spinner from "../../../Components/Layouts/Spinners/Spinner";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import {
  mostrarProductos,
  eliminarProducto,
  cambiarEstadoProducto
} from "../../../Redux/Actions/productos.action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
 
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import imagenWarningProductos from "../../../Components/Assets/Images/advertencia.png";
import { getDistribuidores } from "../../../Redux/Actions/distribuidores.action";
import './ModulosProductos/StyleProductos/Productos.css'
import Paginacion from "../../../Components/Layouts/Paginacion/Paginacion";
import VerProductoModal from "./ModulosProductos/verProductoModal";
import { mostrarProductoEdit } from "../../../Redux/Actions/productos.action"
import imgProductoLogo from "../../../Components/Assets/Images/orden.png"

const Productos = ({
  mostrarProductos,
  eliminarProducto,
  mostrarProductoEdit,
  cambiarEstadoProducto,
  getDistribuidores,
  distribuidor: { distribuidores },
  producto: { productos, loading, totalProductos, totalPaginas },
}) => {

  const [limit, setLimit] = useState(4)
  const [skip, setSkip] = useState(0)
  const [nroPagina, setNroPagina] = useState(1)
  const [stateFiltro, seStateFiltro] = useState("0")

  useEffect(() => {
    if(stateFiltro == "0"){
      mostrarProductos(limit,skip)
    }else{
      mostrarProductos(limit,skip, stateFiltro)
    }
    getDistribuidores()
  }, []);

  useEffect(()=>{
    //console.log(skip)
    //console.log(totalProductos)
    if(totalProductos){
      if(skip >= totalProductos){
        setSkip(skip-limit)
        setNroPagina(nroPagina - 1)
      }else{
        if(stateFiltro == "0"){
          mostrarProductos(limit,skip);
        }else{
          mostrarProductos(limit,skip, stateFiltro)
        }
      }
    }
  },[skip])

  const MySwal = withReactContent(Swal);

  const buttonDelete = (id) => {
    return MySwal.fire({
      title: "¿Quieres eliminar este producto?",
      imageUrl: imagenWarningProductos,
      imageWidth: 100,
      imageHeight: 100,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(id);
        Swal.fire("Eliminado!", "El archivo fue eliminado.", "success").then(
          (resultClose) => {
            //console.log(resultClose)
            if(stateFiltro == "0"){
              mostrarProductos(limit,skip);
            }else{
              mostrarProductos(limit,skip, stateFiltro)
            }
          }
        );
      }
    });
  };

  const [optSmModalDetalles, setOptSmModalDetalles] = useState(false);
 const [datosProductos, setDatosProductos] = useState({})

 const toggleShowDetalles = (item) => {
   //console.log(item)
   setDatosProductos(item);
   setOptSmModalDetalles(!optSmModalDetalles);
 };


  const cambiarPagina = (e,page)=>{
    
    setNroPagina(page)
    setSkip(totalPaginas[page-1])
  }

  const botonEstado = (id, valor) => {
    const data = {
      publicado: valor
    }
    return MySwal.fire({
      title: valor == true ? "¿Quieres Desactivar este producto?" : "¿Quieres Publicar este producto?",
      imageUrl: imagenWarningProductos,
      imageWidth: 100,
      imageHeight: 100,
      confirmButtonColor: "#0a996f",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        cambiarEstadoProducto(id,data );
        Swal.fire("Listo!", "El Producto Fue Modificado.", "success").then(
          (resultClose) => {
            mostrarProductos(limit,skip)
          }
        );
      }
    });
  };

 /*  const cambiarEstadoPublicado = (valor) =>{
    console.log(valor)
    cons
    
  } */


  const cambiarFiltro = (nro) =>{
   
    seStateFiltro(nro)
    if(nro == "0"){
      mostrarProductos(limit,skip)
    }else{
      let filtroProducto = nro
      mostrarProductos(limit,skip,filtroProducto)
    }
  }


  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          {loading ? (
            <Spinner />
          ) : (
            <div className="col-lg-12 grid-margin stretch-card" >
              <div className="card shadow">
                <div className="card-body">
                  <div>
                  <div className="float-right">
                  <label class="selectFiltroFecha" for="slct">
                      <select id="slct" onChange={(e)=>{cambiarFiltro(e.target.value)}}>
                        <option value="0" >Todos Los Productos</option>
                        {
                          distribuidores?.length > 0 && distribuidores?.map((item)=>{
                            return(
                              <option value={item?.uid}>{item?.nombre}</option>
                            )
                          })
                        }
                      </select>
                      <svg>
                        <use xlink:href="#select-arrow-down"></use>
                      </svg>
                    </label>
                    
                    <svg class="sprites">
                      <symbol id="select-arrow-down" viewbox="0 0 10 6">
                        <polyline points="1 1 5 5 9 1"></polyline>
                      </symbol>
                      </svg>
                      
                      <Link to="/agregar-producto" className="mx-2">
                        <Tooltip title="Agregar Nuevo..." className="">
                          <AddBoxIcon>
                            <AddCircleIcon style={{ color: "#78ae62" }} />
                          </AddBoxIcon>
                        </Tooltip>
                      </Link>
                    </div>
                  <h4 className="card-title">Productos</h4>
                  </div>

                  <div className="table-responsive" >
                    <table className="table table-hover">
                      <thead className="table-blue">
                        <tr align="center">
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Unidad</th>
                          <th>Distribuidor</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos?.length > 0 ? (
                          <react.Fragment key="productos">
                            {productos?.map((producto) => {
                              //console.log(producto)
                              return (
                                <react.Fragment key={producto?.uid}>
                                  <tr align="center">
                                  <td className="py-1">
                                    <img
                                      src={imgProductoLogo}
                                      alt="image"
                                    />
                                  </td>
                                  <td className="td">{producto?.nombre}</td>
                                  <td className="td">{producto?.unidad}</td>
                                  <td className="td">
                                    {producto?.distribuidor?.nombre}
                                  </td>
                                  <td className="td">
                                  {
                                         producto?.publicado == true ?
                                         <a><label className="badge badge-success" onClick={()=>{botonEstado( producto?.uid, producto?.publicado)}}>Publicado</label></a>
                                         :
                                         <a><label className="badge badge-danger" onClick={()=>{botonEstado( producto?.uid, producto?.publicado)}}>No Publicado</label></a>
                                       }
                                  </td>
                                  <td>
                                  
                                      <button
                                        type="button"
                                        className="btn btn-inverse-success btn-icon"
                                        onClick={()=>{toggleShowDetalles(producto)}}
                                      >
                                        <i className="ti-eye"></i>
                                      </button>
                                  

                                    <Link
                                      to={`/editarProducto`}
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-inverse-warning btn-icon mx-2"
                                        onClick={()=>{mostrarProductoEdit(producto)}}
                                      >
                                        <i className="ti-pencil"></i>
                                      </button>
                                    </Link>
                                    <button
                                      className="btn btn-inverse-danger btn-icon mx-2"
                                      onClick={() => {
                                        buttonDelete(producto?.uid);
                                      }}
                                    >
                                      <i className="ti-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                                </react.Fragment>
                              );
                            })}
                          </react.Fragment>
                        ) : (
                          null
                        )}
                      </tbody>
                    </table>
                    {
                        productos?.length > 0 ? null :
                        <div align="center">
                          <Spinner/>
                        </div>
                      }
                  </div>
                </div>
                  <div className="wrapper" >
                            <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                <li className="page-item"><button className="page-link" onClick={()=>{setSkip(skip - limit), setNroPagina( parseInt(nroPagina - 1))}} type="button" disabled={skip == 0 ? true : false}>Anterior</button></li>
                                {/* <li className="page-item"><button type="button" className="page-link">{nroPagina}</button></li> */}
                                <Paginacion nroPagina={nroPagina} cambiarPagina={cambiarPagina} totalPaginas={totalPaginas}/>
                                <li className="page-item"><button type="button" className="page-link" onClick={()=>{setSkip(skip + limit), setNroPagina( parseInt(nroPagina + 1))}} disabled={skip >= totalProductos ? true : false}>Siguiente</button></li>
                              </ul>
                            </nav>
                    </div>
              </div>
            </div>
          )}
            <VerProductoModal
              item={datosProductos}
              optSmModalDetalles={optSmModalDetalles}
              setOptSmModalDetalles={setOptSmModalDetalles}
              toggleShowDetalles={toggleShowDetalles}
            />
        </div>
        <Footer />
      </div>
    </Container>
  );
};

Productos.propTypes = {
  mostrarProductos: PropTypes.func.isRequired,
  cambiarEstadoProducto: PropTypes.func.isRequired,
  productos: PropTypes.object.isRequired,
  mostrarProductoEdit: PropTypes.func.isRequired,
  
};

const mapStateToProps = (state) => ({
  producto: state.productosReducer,
  distribuidor: state.distribuidoresReducer,
});

export default connect(mapStateToProps, { mostrarProductoEdit,getDistribuidores,mostrarProductos,cambiarEstadoProducto, eliminarProducto })(
  Productos
);