import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import "./StylePrograma/ProgramaVivo.css";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import AgregarProgramaVivo from "./ModulosPrograma/AgregarProgramaVivo";
import { mostrarProgramasNF } from "../../../../Redux/Actions/programaVivo.action";
import DetallesProgramaVivo from "./ModulosPrograma/DetallesProgramaVivo";

const ProgramaVivo = ({mostrarProgramasNF, programas:{programasNF, loading }}) => {

  const [limit, setLimit] = useState(4)
  const [skip, setSkip] = useState(0)
  const [nroPagina, setNroPagina] = useState(1)
  useEffect(()=>{
    mostrarProgramasNF(limit,skip)
  },[])

  const [optSmModalNuevoPrograma, setoptSmModalNuevoPrograma] = useState(false);
    const toggleShowNuevoPrograma = () => {
      setoptSmModalNuevoPrograma(!optSmModalNuevoPrograma);
    };

  const [optSmModalEditarPrograma, setoptSmModalEditarPrograma] = useState(false);
  const [itemPrograma, setItemPrograma] = useState()
    const toggleShowEditarPrograma = (item) => {
      setoptSmModalEditarPrograma(!optSmModalEditarPrograma);
      setItemPrograma(item)
    };

  /*   console.log(programasNF) */

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <div>
                <div className="float-right">
                  <a
                  onClick={() => {
                    toggleShowNuevoPrograma();
                    }}
                  >
                    <Tooltip title="Agregar Nueva Noticia..." className="">
                      <AddBoxIcon>
                        <AddCircleIcon style={{ color: "#78ae62" }} />
                      </AddBoxIcon>
                    </Tooltip>
                  </a>
                </div>
              </div>
              <div className="container">
                <h3 class="my-4">Todos Los Programas De NETAMENTE FORMOSEÑO</h3>
                <div class="wrapperPrograma wrapperPrograma-light">
                  <div class="scrollable-container">
                    <div class="scrollable-cardProgramas">
                      {
                        programasNF.length > 0 && programasNF?.map((item)=>{
                          const fecha = new Date(item?.fecha);
                          const fechaConvertida = fecha.toLocaleDateString();
                          /* console.log(item?.vivo) */
                          return(
                            <div class="cardPrograma-h ">
                            <a href={item?.videoLink} target="_blank">
                          <div class="cardPrograma-thumbnail">
                              <img src={item?.miniaturaLink} />
                            {
                              item?.vivo == true ?
                              <div class="tag tag-primary cardPrograma-tag">
                              Programado
                            </div>
                            : null
                            }
  
                            <div
                              class="cardPrograma-specialties"
                              style={{ backgroundColor: "black" }}
                              >
                              {item?.titulo}
                            </div>
                          </div>
                              </a>
                          <div class="cardPrograma-body">
                            <h3 class="cardPrograma-title">Descripcion</h3>
                            <div class="cardPrograma-name">
                              {
                                item?.publicado == true ?
                                <label class="badge badge-success">Publicado</label>
                                : <label class="badge badge-warning">Pendiente</label>
                              }
                            </div>
                          </div>
                          <div class="cardPrograma-foot">
                            <div class="cardPrograma-rating">
                              <div class="stars">
                                <button
                                  type="button"
                                  class="btn btn-inverse-success btn-icon"
                                  onClick={()=>{toggleShowEditarPrograma(item)}}
                                >
                                  <i class="ti-pencil"></i>
                                </button>
                              </div>
                              {fechaConvertida}
                            </div>
                          </div>
                        </div>
                          )
                        })
                      }
                     

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AgregarProgramaVivo
          optSmModalNuevoPrograma = {optSmModalNuevoPrograma}
          setoptSmModalNuevoPrograma = {setoptSmModalNuevoPrograma}
          toggleShowNuevoPrograma = {toggleShowNuevoPrograma} 
          />
          <DetallesProgramaVivo
            optSmModalEditarPrograma={optSmModalEditarPrograma}
            setoptSmModalEditarPrograma={setoptSmModalEditarPrograma}
            toggleShowEditarPrograma={toggleShowEditarPrograma}
            itemPrograma={itemPrograma}
          />
        </div>
        <Footer />
      </div>
    </Container>
  );
};


ProgramaVivo.propTypes = {
  mostrarProgramasNF: PropTypes.func.isRequired,
  programasNF: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  programas: state.programaVivoReducer,
});

export default connect(mapStateToProps, { mostrarProgramasNF })(ProgramaVivo);

