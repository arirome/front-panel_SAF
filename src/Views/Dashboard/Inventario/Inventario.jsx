import { mostrarInventarios, eliminarInventario } from "../../../Redux/Actions/inventario.action"
import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from '../../../Components/Layouts/Container/Container'
import Footer from '../../../Components/Layouts/Footers/Footer'
import Spinner from "../../../Components/Layouts/Spinners/Spinner";
import faceIMG from "../../../Components/Assets/images/faces/face1.jpg"
import './Inventario.css'
import { Link } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DetallesInventario from "./Modulos Inventario/DetallesInventario";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Inventario = ({ mostrarInventarios, eliminarInventario, inventario: { inventarios, loading, totalInventario } }) => {

  const [limit, setLimit] = useState(4)
  const [skip, setSkip] = useState(0)
  const [nroPagina, setNroPagina] = useState(1)

  useEffect(() => {
    mostrarInventarios(limit,skip);
  }, []);

  useEffect(()=>{
    //console.log(skip)
    //console.log(totalProductos)
    if(totalInventario){
      if(skip >= totalInventario){
        setSkip(skip-limit)
        setNroPagina(nroPagina - 1)
      }else{
        mostrarInventarios(limit,skip);
      }
    }
  },[skip])

  const [optSmModalDetalles, setOptSmModalDetalles] = useState(false);
  const [datosInventario, setDatosInventario] = useState("");


  const toggleShowDetalles = (item) => {
    //console.log(item)
    setDatosInventario(item);
    setOptSmModalDetalles(!optSmModalDetalles);
  };


  const MySwal = withReactContent(Swal)
  const handleBounceIn = (id) => {
    //console.log(id)
    return MySwal.fire({
      title: 'Seguro que lo quiere eliminar?',
      text: "Quedara Guardado En 'Archivados'",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      //console.log(result.isDismissed)
      if (result.isConfirmed) {
        //console.log(id)
          eliminarInventario(id)
        Swal.fire(
          'Eliminado!',
          'El archivo fue eliminado.',
          'success'
        ).then((resultClose) => {
          //console.log(resultClose)
          mostrarInventarios()
        })
      }
    })
  }

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">

          {
            loading ? <Spinner />
              :
              <div className="col-lg-12 grid-margin stretch-card" >
                <div className="card shadow" >
                  <div className="card-body" >
                    <div>
                    <div className="float-right">
                        <Link to="/agregar-inventario">
                        <Tooltip title="Agregar Nuevo..." className="">
                          <IconButton>
                            <AddCircleIcon style={{ color: '#78ae62' }} />
                          </IconButton>
                        </Tooltip>
                        </Link>
                      </div>
                      <h4 className="card-title ">Inventario</h4>
                    </div>
                    {/*  <Tooltip title="Agregar Nuevo Producto Al Inventario...">
                    <button type="button" className="btn btn-inverse-primary btn-rounded btn-icon ">
                      <i className="ti-clipboard"></i>
                    </button>
                    </Tooltip> */}


                    {/* <p className="card-description">
                    Add className <code>.table-striped</code>
                  </p> */}
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr align='center'>
                            <th>
                              #
                            </th>
                            <th>
                              Nombre
                            </th>
                            <th>
                              Apellido
                            </th>
                            <th>
                              Cantidad de productos
                            </th>
                            <th>
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            inventarios.length > 0 ?
                              <react.Fragment key="inventario">
                                {
                                  inventarios?.map((inventario) => {
                                    //console.log(inventario)
                                    return (
                                      <react.Fragment key={inventario?.uid}>
                                      <tr align='center' key={inventario?.uid}>
                                        <td className="py-1">
                                          <img src="https://images.vexels.com/media/users/3/199820/isolated/preview/892bfdfcb80b356c53405aafbb716513-caja-de-carton-isometrica.png" alt="image" />
                                        </td>
                                        <td>
                                          {inventario?.usuario?.nombre}
                                        </td>
                                        <td>
                                          {inventario?.usuario?.apellido}
                                        </td>
                                        <td>
                                          {inventario?.totalDeProductos}
                                        </td>
                                        <td>
                                          <button type="button" className="btn btn-inverse-success btn-icon" onClick={()=>{toggleShowDetalles(inventario)}}>
                                            <i className="ti-eye"></i>
                                          </button>
                                          <Link to= {`/editar-Inventario/${inventario?.uid}`}>
                                          <button type="button" className="btn btn-inverse-warning btn-icon mx-2">
                                            <i className="ti-pencil"></i>
                                          </button>
                                          </Link>
                                          <button type="button" className="btn btn-inverse-danger btn-icon" 
                                          onClick={()=>{handleBounceIn(inventario?.uid)}}
                                          >
                                            <i className="ti-trash"></i>
                                          </button>
                                        </td>
                                      </tr>
                                      </react.Fragment>
                                    )
                                  })
                                }
                              </react.Fragment>
                              :
                              null
                          }
                        </tbody>
                      </table>
                      {
                        inventarios.length > 0 ? null :
                        <div align="center" style={{marginTop: "20px"}}>
                          <h5>No Hay Datos Cargandos...</h5>
                        </div>
                      }
                      
                    </div>
                    
                  </div>
                  <div className="wrapper" >
                            <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                <li className="page-item"><button className="page-link" onClick={()=>{setSkip(skip - limit), setNroPagina( parseInt(nroPagina - 1))}} type="button" disabled={skip == 0 ? true : false}>Anterior</button></li>
                                <li className="page-item"><button type="button" className="page-link">{nroPagina}</button></li>
                                <li className="page-item"><button type="button" className="page-link" onClick={()=>{setSkip(skip + limit), setNroPagina( parseInt(nroPagina + 1))}} disabled={skip >= totalInventario ? true : false}>Siguiente</button></li>
                              </ul>
                            </nav>
                    </div>
                </div>
                
              </div>
          }
            <DetallesInventario
            item={datosInventario}
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

Inventario.propTypes = {
  mostrarInventarios: PropTypes.func.isRequired,
  inventarios: PropTypes.object.isRequired,
  eliminarInventario: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  inventario: state.inventarioReducer,
});

export default connect(mapStateToProps, { mostrarInventarios, eliminarInventario })(Inventario);
