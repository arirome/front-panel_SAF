import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import imagenVerPunto from '../../../../Components/Assets/Images/vista.png'
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";

const VerPuntoModal = ({
  item,
  optSmModalDetalles,
  setOptSmModalDetalles,
  toggleShowDetalles,

}) => {
  
  const [datosPuntos, setDatosPuntos] = useState({})
  const [fechaFormato, setFechaFormato] = useState()
  
  
  useEffect(()=>{
    setDatosPuntos(item)
   
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
          <img src={imagenVerPunto} alt="" className="itemImg" style={{display: "inline-block", verticalAlign: "middle", marginRight: "10px", width:"50px"}}/>
          <h5 style={{display: "inline-block", verticalAlign: "middle"}}>{datosPuntos?.nombre}</h5>
          </div>
          </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>
          <div className="container">
            <div >
              <h4 >Barrio:</h4>
              <p>{datosPuntos?.barrio}</p>
            </div>
            <hr/>
            <div>
              <h4>Departamento:</h4>
              <p>{datosPuntos?.departamento}</p>
            </div>
            <hr/>
            <div>
            <h4>Descripcion:</h4>
            <p>{datosPuntos?.descripcion}</p>
            </div>
            <hr className="new1" />
            <div className="mb-3">
                {
                  datosPuntos?.publicado == true ?
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

/* DetallesInventario.propTypes = {
    mostrarPunto: PropTypes.func.isRequired,
    puntos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  punto: state.puntosReducer,
});

export default connect(mapStateToProps, {
    mostrarPunto,
})(DetallesInventario); */

export default VerPuntoModal