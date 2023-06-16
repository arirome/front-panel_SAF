import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../../../Components/Layouts/Container/Container";
import Footer from "../../../Components/Layouts/Footers/Footer";
import Spinner from "../../../Components/Layouts/Spinners/Spinner";
import { mostrarParteDia, mostrarParteDiaPorFecha } from "../../../Redux/Actions/parteDelDia.action";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import './ModulosParteDelDia/StyleParte/Parte.css'

const ParteDelDia = ({
  mostrarParteDia,
  parteDia: { partes_dias, loading, totalPartes },
  mostrarParteDiaPorFecha
}) => {
  /* console.log(loading) */
  const [limit, setLimit] = useState(4)
  const [skip, setSkip] = useState(0)
  const [nroPagina, setNroPagina] = useState(1)

  useEffect(() => {
    mostrarParteDia(limit,skip);
  }, []);


  /* const [filtroFecha, setFiltroFecha] = useState("Todo (2023)") */
  

  const cambiarFiltro = (nro) =>{
    /* console.log(nro) */
    if(nro == "0"){
      let fechaInicio = "2023/01/01"
      let fechaFinal = "2023/12/31"
      mostrarParteDia(limit,skip,fechaInicio,fechaFinal);

    }else if(nro == "12"){
      let fechaInicio = `2023/${nro}/01`
      let fechaFinal = `2024/01/01`
      mostrarParteDia(limit,skip,fechaInicio,fechaFinal);

    }else {
      let fechaInicio = `2023/${nro}/01`
      let fechaFinal = `2023/${parseInt(nro) + 1}/01`
      mostrarParteDia(limit,skip,fechaInicio,fechaFinal);
    }

  }



  useEffect(()=>{
    //console.log(skip)
    //console.log(totalProductos)
    if(totalPartes){
      if(skip >= totalPartes){
        setSkip(skip-limit)
        setNroPagina(nroPagina - 1)
      }else{
        mostrarParteDia(limit,skip);
      }
    }
  },[skip])

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          {loading ? (
            <div align="center">
              <Spinner />
            </div>
          ) : (
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card shadow">
                <div className="card-body">
                  
                  <div>
                    
                  <div className="float-right">
                  <div className="dropdown flex-md-grow-1 ">
                    {/*  <button className="btn btn-sm btn-light bg-white dropdown-toggle" type="button" id="dropdownMenuDate2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <i className="mdi mdi-calendar"></i> {filtroFecha}
                     </button>
                     <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate2" style={{cursor:"pointer"}}>
                       <a className="dropdown-item" onClick={()=>{cambiarFiltro(0)}} >Todo (2023)</a>
                       <a className="dropdown-item" onClick={()=>{cambiarFiltro(1)}}>Enero - Febrero</a>
                       <a className="dropdown-item" onClick={()=>{cambiarFiltro(2)}}>Marzo - Abril</a>
                       <a className="dropdown-item" onClick={()=>{cambiarFiltro(3)}}>Mayo - Junio</a>
                       <a className="dropdown-item" onClick={()=>{cambiarFiltro(4)}}>Julio - Agosto</a>
                       <a className="dropdown-item" onClick={()=>{cambiarFiltro(5)}}>Septiembre - Octubre</a>
                       <a className="dropdown-item" onClick={()=>{cambiarFiltro(6)}}>Noviembre - Diciembre</a>
                     </div> */}
                     <label class="selectFiltroFecha" for="slct">
                      <select id="slct" onChange={(e)=>{cambiarFiltro(e.target.value)}}>
                        <option value="0" >Todos (2023)</option>
                        <option value="1">Enero</option>
                        <option value="2">Febrero</option>
                        <option value="3">Marzo</option>
                        <option value="4">Abril</option>
                        <option value="5">Mayo</option>
                        <option value="6">Junio</option>
                        <option value="7">Julio</option>
                        <option value="8">Agosto</option>
                        <option value="9">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option> 
                        <option value="12">Diciembre</option>
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
                     <Link to="/seleccionar-punto">
                        <Tooltip title="Agregar Nuevo..." className="">
                          <IconButton>
                            <AddCircleIcon style={{ color: "#78ae62" }} />
                          </IconButton>
                        </Tooltip>
                      </Link>
                   </div>
                      

                      
                    </div>
                    
                  <h4 className="card-title">Parte del Dia</h4>
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
                        <tr align="center">
                          <th>#</th>
                          <th>Fecha</th>
                          <th>Total Informes</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {partes_dias? (
                          <>
                            {partes_dias?.map((pd) => {
                                /*console.log(pd?.parte_fecha)*/
                                let fecha = new Date(pd?.parte_fecha).toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
                                const palabras = fecha.split(" ");
                                for (let i = 0; i < palabras.length; i++) {
                                  palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substring(1);
                                }
                                const fechaMayusculas = palabras.join(" ");


                                
                                return (
                                <react.Fragment key={pd?.uid}>
                                <tr align="center" key={pd?.uid}>
                                <td className="py-1">
                                  <img
                                    src="https://images.vexels.com/media/users/3/199820/isolated/preview/892bfdfcb80b356c53405aafbb716513-caja-de-carton-isometrica.png"
                                    alt="image"
                                  />
                                </td>
                                <td>{ fechaMayusculas}</td>
                                <td>{pd?.datos?.length}</td>
                                <td>
                                  
                                  <Link to={`/detalles-partes-dias/${pd?._id}`}>
                                  <button
                                    type="button"
                                    className="btn btn-inverse-success btn-icon"
                                    onClick={()=>{mostrarParteDiaPorFecha(pd)}}
                                  >
                                    <i className="ti-eye"></i>
                                  </button>
                                  </Link>
                                  <button
                                    type="button"
                                    className="btn btn-inverse-warning btn-icon mx-2"
                                  >
                                    <i className="ti-pencil"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-inverse-danger btn-icon"
                                  >
                                    <i className="ti-trash"></i>
                                  </button>
                                 
                                </td>
                                
                              </tr>
                             {/*  <div hidden={mostrarMensaje}>
                                <h3>Fecha: {pd?.parte_fecha}</h3>
                              </div> */}
                                </react.Fragment>

                                
                              );
                            })}
                          </>
                        ) : null}
                      </tbody>
                    </table>
                    {partes_dias.length == 0 ? (
                      <div align="center" style={{marginTop: "20px"}}>
                        <h6>No hay Partes Del Dia Cargados</h6>
                      </div>
                    ) : null}
                  </div>
                  <div class="wrapper" >
                            <nav aria-label="Page navigation example">
                              <ul class="pagination">
                                <li class="page-item"><button class="page-link" onClick={()=>{setSkip(skip - limit), setNroPagina( parseInt(nroPagina - 1))}} type="button" disabled={skip == 0 ? true : false}>Anterior</button></li>
                                <li class="page-item"><button type="button" class="page-link">{nroPagina}</button></li>
                                <li class="page-item"><button type="button" class="page-link" onClick={()=>{setSkip(skip + limit), setNroPagina( parseInt(nroPagina + 1))}}>Siguiente</button></li>
                              </ul>
                            </nav>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </Container>
  );
};

ParteDelDia.propTypes = {
  mostrarParteDia: PropTypes.func.isRequired,
  partes_dias: PropTypes.object.isRequired,
  mostrarParteDiaPorFecha: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  parteDia: state.parteDelDiaReducer,
});

export default connect(mapStateToProps, { mostrarParteDia, mostrarParteDiaPorFecha })(ParteDelDia);
