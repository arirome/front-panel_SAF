import React, { useState } from "react";

import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";

const ModalCambioInicial = ({
  optSmModalCambioIncial,
  setOptSmModalCambioIncial,
  funcionGuardarCambioInicial
}) => {

    const [cambioInicial, setCambioInicial] = useState("")

    const enviarCambioInicial = () => {
        let cambioInicialText;
        if(cambioInicial == ""){
            cambioInicialText = "No Hay Cambio Inicial"
        }else{
            cambioInicialText = cambioInicial
        }
        funcionGuardarCambioInicial( cambioInicialText)
        setCambioInicial("")
    }


  return (
    <div className="container">
      <MDBModal
        staticBackdrop
        stabindex="-1"
        show={optSmModalCambioIncial}
        setShow={setOptSmModalCambioIncial}
      >
        <MDBModalDialog >
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <div>
                  <h5>
                   💰 Agregar el cambio Inicial
                  </h5>
                </div>
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <div align="center">
                <div >
                  <div >
                    <p className="dis fw-bold mb-2">INGRESAR EL CAMBIO INICIAL</p>
                    <textarea
                    className="form-control"
                    onChange={(e)=>{setCambioInicial(e.target.value)}}
                    rows="3"
                    >
                    </textarea>
                  </div>
                </div>
                <hr/>
                {
                    cambioInicial == "" ?
                    <button className="btn btn-warning" onClick={()=>{enviarCambioInicial()}}>Cerrar</button>
                    :
                    <button className="btn btn-success" onClick={()=>{enviarCambioInicial()}}>Guardar</button>
                }
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default ModalCambioInicial;