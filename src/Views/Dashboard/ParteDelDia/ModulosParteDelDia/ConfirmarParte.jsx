import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { mostrarPuntoUnico } from "../../../../Redux/Actions/puntos.action.js";
import "./StyleParte/ConfirmacionModal.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getDistribuidores } from "../../../../Redux/Actions/distribuidores.action.js";
import { mostrarProductos } from "../../../../Redux/Actions/productos.action.js"
import { crearParteDia } from "../../../../Redux/Actions/parteDelDia.action";
import { formatNumber } from "../../../../Components/Helpers/formatoNumero.js";
import Spinner from "../../../../Components/Layouts/Spinners/Spinner.jsx";
import {  useHistory } from "react-router-dom";
const DetallesParte = ({
  item,
  mostrarPuntoUnico,
  puntoUnico: { punto },
  getDistribuidores,
  distribuidor: { distribuidores },
  mostrarProductos, 
  producto: { productos },
  crearParteDia,
}) => {
  const [show, setShow] = useState(false);
  const history = useHistory();
/*   console.log(item) */

  useEffect(() => {
    if (item?.fecha) {
      setShow(true);
   /*    console.log(item.distribuidor); */
      mostrarPuntoUnico(item?.ubicacion);
      //console.log(punto)
      getDistribuidores();
      mostrarProductos()
    } else {
      setShow(false);
    }
  }, [item]);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fechaHoy = new Date()
  const [isLoadingParte, setIsLoadingParte] = useState(false)
  const guardarDB = async () => {
    setIsLoadingParte(true)
    const data = {
      ...item,
      fecha: fechaHoy
    }
    await crearParteDia(data)
    setIsLoadingParte(false)
    history.push("/parte-del-dia");
  }
  

  return (
    <>
      {/*    <Button variant="primary" onClick={() => setShow(true)}>
        Abricion
      </Button> */}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogclassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <h5>Parte Del Dia [ Resumen ]</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="px-4">
              <p className="text-uppercase">
                Fecha Del Dia: <strong>{item?.fecha}</strong>
              </p>
              {punto ? (
                <span className="theme-color">Punto: {punto?.barrio}</span>
              ) : (
                <span className="theme-color">Cargando Punto</span>
              )}
              <div className="mb-3">
                <hr className="new1" />
              </div>

              {/*  <div className="d-flex justify-content-between">
                <span className="font-weight-bold">Ether Chair(Qty:1)</span>
                <span className="text-muted">$1750.00</span>
              </div> */}

              {item?.distribuidor?.map((data) => {
                var descripcionDistribuidor;
               
                 //console.info(item?.distribuidor?.length)
                for (var i = 0; i < distribuidores?.length; i++) {
                  //console.log("nro", i , data.nombre)
                  if (data.nombre === distribuidores[i]?.uid) {
                    descripcionDistribuidor = distribuidores[i]?.nombre;
                    
                  }
                }
                
                return (
                 <div style={{marginTop:'10px'}}>
                   <Accordion
                    expanded={expanded === `panel${data?.nombre}`}
                    onChange={handleChange(`panel${data?.nombre}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: "50%", flexShrink: 0, color:'#095169' }}>
                        {descripcionDistribuidor}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {data?.nota}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {
                        data?.stock?.map((dataProducto)=>{
                         
                          return(
                            <>
                            <div className="d-flex justify-content-between">
                              <small>Producto: {dataProducto?.productoNombre}
                              <hr/>
                              <p>Stock Incial: {dataProducto.stockInicial}</p>
                              <p>Stock Final: {dataProducto.stockFinal}</p>
                              <p><strong>Total Vendido: {dataProducto.totalvendido}</strong></p>
                              </small>
                              <small style={{color:'green'}}>Recaudado: $ {formatNumber(dataProducto?.totalRecaudado)}</small>
                            </div>
                            <hr></hr>
                            </>
                          )
                        })
                      }
                    </AccordionDetails>
                  </Accordion>
                 </div>
                );
              })}

              <div className="d-flex justify-content-between mt-3">
                <span className="font-weight-bold">Total Recaudado</span>
                <span className="font-weight-bold theme-color">
                  $ {formatNumber(item?.recaudacionTotal)}
                </span>
              </div>
              {
                isLoadingParte ?
                <div align="center">
                  <Spinner/>
                </div>
                :
                <div className="text-center mt-5">
                  <button className="btn btn-success" onClick={()=>{guardarDB()}}>Guardar y Cerrar</button>
                </div>
              }
              
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

DetallesParte.propTypes = {
  mostrarPuntoUnico: PropTypes.func.isRequired,
  punto: PropTypes.object.isRequired,
  getDistribuidores: PropTypes.func.isRequired,
  mostrarProductos: PropTypes.func.isRequired,
  crearParteDia: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  puntoUnico: state.puntosReducer,
  distribuidor: state.distribuidoresReducer,
  producto: state.productosReducer,
});

export default connect(mapStateToProps, {
  mostrarPuntoUnico,
  getDistribuidores,
  mostrarProductos,
  crearParteDia
})(DetallesParte);
