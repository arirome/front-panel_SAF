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

const ModalAgregarNota = ({
  optSmModalNota,
  setOptSmModalNota,
  funcionGuardarNota,
  nombreDistribuidor,
}) => {

    const [notaText, setNotaText] = useState("")

    const enviarNota = () => {
        let textoNota;
        if(notaText == ""){
            textoNota = "No Hay Nota"
        }else{
            textoNota = notaText
        }
        funcionGuardarNota( textoNota)
        setNotaText("")
    }
  return (
    <div className="container">
      <MDBModal
        staticBackdrop
        stabindex="-1"
        show={optSmModalNota}
        setShow={setOptSmModalNota}
      >
        <MDBModalDialog style={{ marginTop: "10px", overflowY: "scroll" }}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <div>
                  <h5>
                    Agregar Una Nota Al Distribuidor 
                  </h5>
                </div>
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <div align="center">
                <div >
                  <div >
                    <p className="dis fw-bold mb-2">INGRESAR LA NOTA</p>
                    <textarea
                    className="form-control"
                    onChange={(e)=>{setNotaText(e.target.value)}}
                    rows="3"
                    >
                    </textarea>
                  </div>
                </div>
                <hr/>
                {
                    notaText == "" ?
                    <button className="btn btn-warning" onClick={()=>{enviarNota()}}>Cerrar</button>
                    :
                    <button className="btn btn-success" onClick={()=>{enviarNota()}}>Guardar</button>
                }
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default ModalAgregarNota;
