import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import imagenVerProducto from "../../../../Components/Assets/Images/productover.png";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import { formatNumber } from "../../../../Components/Helpers/formatoNumero";

const VerProductoModal = ({
  item,
  optSmModalDetalles,
  setOptSmModalDetalles,
  toggleShowDetalles,

}) => {
  
  const [datosProductos, setDatosProductos] = useState({})
  const [fechaFormato, setFechaFormato] = useState()
  
  
  useEffect(()=>{
    setDatosProductos(item)
   /*  console.log(item) */
    if(item?.updatedAt){
      const fecha = new Date(item.updatedAt);
      setFechaFormato(fecha.toLocaleDateString())
    }

  },[item])

 
  
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
            <div>
            <img src={imagenVerProducto} alt="" className="itemImg" style={{display: "inline-block", verticalAlign: "middle", marginRight: "10px", width:"50px"}}/>
          <h5 style={{display: "inline-block", verticalAlign: "middle"}}>{datosProductos?.nombre}</h5>
            </div>
          </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>
        <div className="container">
            <div >
              <h4 >Precio:</h4>
              <p>$ {formatNumber(datosProductos?.precio)} por {datosProductos?.unidad}</p>
            </div>
            <hr/>
            <div>
              <h4>Distribuidor:</h4>
              <p>{datosProductos?.distribuidor?.nombre}</p>
            </div>
            <hr/>
            <div>
            <h4>Descripcion:</h4>
            <p>{datosProductos?.descripcion}</p>
            </div>
            <hr className="new1" />
            <div className="mb-3">
                {
                  datosProductos?.publicado == true ?
                    <label className="badge badge-success">Publicado</label>
                    :
                    <label className="badge badge-danger">No Publicado</label>
                }
            </div>
            <hr/>
               
              <div className="text-right"><span className="theme-color" style={{fontSize:"12px"}}>Ultima Actualización: {fechaFormato} </span></div>
            <div className="text-center mt-5">
                <button className="btn btn-warning" onClick={()=>{setOptSmModalDetalles()}}>Cerrar</button>
            </div>
          </div>
        </MDBModalBody>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  );
};



export default VerProductoModal