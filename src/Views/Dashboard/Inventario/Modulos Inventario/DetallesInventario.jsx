import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";


import { mostrarPunto } from "../../../../Redux/Actions/puntos.action.js";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";

const DetallesInventario = ({
  item,
  optSmModalDetalles,
  setOptSmModalDetalles,
  toggleShowDetalles,
  mostrarPunto,
  punto: { puntos }
}) => {
  const [datosInventario, setDatosInventario] = useState({})
  useEffect(()=>{
    mostrarPunto()
  },[])

  useEffect(()=>{
    setDatosInventario(item)
   
  },[item])

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  
  return (
    <MDBModal
    staticBackdrop
    stabindex="-1"
    show={optSmModalDetalles}
    setShow={setOptSmModalDetalles}
  >
    <MDBModalDialog style={{marginTop:"50px", overflowY: "scroll"}}>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>
          <h5>Productos Cargados</h5>
          </MDBModalTitle>
         
        </MDBModalHeader>
        <MDBModalBody>
        <div>
            <div className="px-4">
              <p className="text-uppercase">
                Responsable: <strong>{datosInventario?.usuario?.nombre} {datosInventario?.usuario?.apellido}</strong>
              </p>
              <div align="center"><span className="theme-color" >Productos ({datosInventario?.totalDeProductos})</span></div>
              <div className="mb-3">
                <hr className="new1" />
              </div>
              {datosInventario?.productos?.map((data) => {
                var descripcionDestino = "Sin Destino";
               
            
                for (var i = 0; i < puntos.length; i++) {
               
                  if (data?.destino?._id === puntos[i]?.uid) {
                    descripcionDestino = puntos[i]?.nombre;
                    
                  }
                }
                
           
                return (
                 <div style={{marginTop:'10px'}}>
                   <Accordion
                    expanded={expanded === `panel${data?._id}`}
                    onChange={handleChange(`panel${data?._id}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: "50%", flexShrink: 0, color:'#095169' }}>
                        {data?.nombre}
                      </Typography>
                   
                    </AccordionSummary>
                    <AccordionDetails>
                    <div className="d-flex justify-content-between">
                              <small>Cantidad Enviada de {data?.nombre}: <strong>{data?.cantidadProducto} {data?.unidad}</strong>
                              <p></p>
                              <p>Precio: <strong style={{color:'green'}}>$ {data?.precio}</strong></p>
                              <p>Destino: {descripcionDestino}</p>
                           
                              </small>
                              
                            </div>
                            <hr></hr>
                    
                    </AccordionDetails>
                  </Accordion>
                 </div>
                );
              })}

             
              <div className="text-center mt-5">
                <button className="btn btn-warning" onClick={()=>{setOptSmModalDetalles()}}>Cerrar</button>
              </div>
            </div>
          </div>
        </MDBModalBody>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  );
};

DetallesInventario.propTypes = {
    mostrarPunto: PropTypes.func.isRequired,
    puntos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  punto: state.puntosReducer,
});

export default connect(mapStateToProps, {
    mostrarPunto,
})(DetallesInventario);