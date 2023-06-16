import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";

import { Link } from "react-router-dom";
import "./Style Inventario/EditarInventario.css";
import RateReviewIcon from '@mui/icons-material/RateReview';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { mostrarInventarioUnico } from "../../../../Redux/Actions/inventario.action"
import Spinner from "../../../../Components/Layouts/Spinners/Spinner";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ModalEditarInventario from "./ModalEditarInventario";
const EditarInventario = ({ mostrarInventarioUnico, inventarioUnico: { inventario, loading }, match}) => {

  useEffect(()=>{
    mostrarInventarioUnico(match.params.idInventario)
  },[])

  const [datos, setDatos] = useState({})
  const [datosInventario, setDatosInventario] = useState()
  const [datosPosicion, setDatosPosicion] = useState()
  const [optSmModalEditar, setOptSmModalEditar] = useState(false);

  const toggleShowEditar = (item, inventario, i) => {
    //console.log(item)
    setDatos(item)
    setDatosInventario(inventario)
    setDatosPosicion(i)
    setOptSmModalEditar(!optSmModalEditar);
  };


  //console.log(inventario)

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card" >
              <div className="card-body">
                <h4 className="card-title">
                <Link to="/inventario">
                              <button
                                type="button"
                                class="btn btn-inverse-success btn-icon"
                              >
                                <i class="ti-arrow-left"></i>
                              </button>
                            </Link>{" "}Editar Inventario
                </h4>
                <div className="container mt-5">
                  <div>
                    <p>Responsable: <strong>{inventario?.usuario?.nombre} {inventario?.usuario?.apellido}</strong></p>
                  </div>
                  <div className="row">
                    {
                      inventario ? 
                      <>
                      {
                        inventario?.productos?.length > 0 ?
                        <>
                        {
                          inventario?.productos?.map((item, i)=>{
                            return(
                            <>
                            <div className="col-md-4 mx-2">
                      <div className="card p-3">
                        <div className="d-flex flex-row mb-3">
                          <img
                            src={item?.img}
                            width="70"
                          />
                          <div className="d-flex flex-column ml-2">
                            <span>{item?.nombre} </span>
                            <span className="text-black-50">
                              {item?.cantidadProducto} {item?.unidad}
                            </span>
                            
                          </div>
                        </div>
                       <div align="center">
                       <h6>
                           {/* <ShoppingBagIcon style={{ color: "green" }}/> */}
                        Precio: <br/>$ <strong style={{color:"green"}}>{item?.precio}</strong>
                        </h6>
                        <h6>
                          {/* <LocationOnIcon style={{ color: "green" }}/> */}
                        Destino: <br/>{item?.destino?.nombre}
                        </h6>
                       </div>
                        <div className="d-flex justify-content-between install mt-3">
                          <span>Barrio: {item?.destino?.barrio}</span>
                          <span className="text-primary">
                          <Tooltip title="Editar Producto..." className="" >
                            <IconButton >
                              <RateReviewIcon style={{ color: "#f2a73d" }} onClick={()=>{toggleShowEditar(item, inventario, i)}} />
                            </IconButton>
                          </Tooltip>
                          </span>
                        </div>
                      </div>
                    </div>
                            </>  
                            )
                          })
                        }
                        </>
                        :
                        <Spinner/>
                      }
                      </>
                      :
                      <>
                      <Spinner/>
                      </>
                    }
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div style={{ overflowY: "scroll"}}>
            
          <ModalEditarInventario
                  item={datos}
                  optSmModalEditar={optSmModalEditar}
                  setOptSmModalEditar={setOptSmModalEditar}
                  toggleShowEditar={toggleShowEditar}
                  datosInventario={datosInventario}
                  datosPosicion={datosPosicion}
                  />
          </div>
        </div>
        <Footer />
      </div>
    </Container>
  );
};

EditarInventario.propTypes = {
  mostrarInventarioUnico: PropTypes.func.isRequired,
  inventario: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
  inventarioUnico: state.inventarioReducer,
});

export default connect(mapStateToProps, { mostrarInventarioUnico })(EditarInventario);
