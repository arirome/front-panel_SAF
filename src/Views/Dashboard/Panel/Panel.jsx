import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";

import imgFace1 from './../../../Components/Assets/images/faces/face1.jpg'
import imgFace2 from './../../../Components/Assets/images/faces/face2.jpg'
import imgFace3 from './../../../Components/Assets/images/faces/face3.jpg'
import imgFace4 from './../../../Components/Assets/images/faces/face4.jpg'
import imgFace5 from './../../../Components/Assets/images/faces/face5.jpg'
import imgDasboard from './../../../Components/Assets/images/dashboard/people.png'
import Container from './../../../Components/Layouts/Container/Container'
import Footer from '../../../Components/Layouts/Footers/Footer'
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { mostrarNoticias } from "../../../Redux/Actions/noticia.action";
import { mostrarProductos } from "../../../Redux/Actions/productos.action";
import { mostrarProgramasNF } from "../../../Redux/Actions/programaVivo.action";
import { mostrarNotificaciones } from "../../../Redux/Actions/notificaciones.action";

import parse from 'html-react-parser';
const Panel = ({
  mostrarNoticias,
  mostrarProductos,
   noticia:{noticias, loading},
   producto: { productos },
   mostrarProgramasNF, 
   programas:{programasNF},
   mostrarNotificaciones,
   notificacion:{notificaciones} 
  }) => {


  const fechaActual = new Date().toLocaleDateString('es-AR')
  
  const [limit, setLimit] = useState(1)
  const [skip, setSkip] = useState(0)

  const [limitPrograma, setLimitPrograma] = useState(4)
  const [skipPrograma, setSkipPrograma] = useState(0)
  useEffect(()=>{
    mostrarNoticias(limit,skip)
    mostrarProductos(limit, skip)
    mostrarProgramasNF(limitPrograma,skipPrograma)
    mostrarNotificaciones()
  },[])

/*   console.log(notificaciones) */
  

  return (
    <Container>

       <div className="main-panel">
         <div className="content-wrapper">

           <div className="row">
             <div className="col-md-12 grid-margin">
               <div className="row">
                 <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                   <h3 className="font-weight-bold">Bienvenido</h3>
                   <h6 className="font-weight-normal mb-0">¡Todos los sistemas funcionan sin problemas. {notificaciones?.length > 0 ? <span className="text-primary">Tienes alertas sin leer!</span> : null}</h6>
                 </div>
                 {/* <div className="col-12 col-xl-4">
                  <div className="justify-content-end d-flex">
                   <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                     <button className="btn btn-sm btn-light bg-white dropdown-toggle" type="button" id="dropdownMenuDate2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <i className="mdi mdi-calendar"></i> Todo (2023)
                     </button>
                     <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate2">
                       <a className="dropdown-item" href="#">Enero - Febrero</a>
                       <a className="dropdown-item" href="#">Marzo - Abril</a>
                       <a className="dropdown-item" href="#">Mayo - Junio</a>
                       <a className="dropdown-item" href="#">Julio - Agosto</a>
                     </div>
                   </div>
                  </div>
                 </div> */}
               </div>
             </div>
           </div>

           <div className="row">
             <div className="col-md-6 grid-margin stretch-card">
               {/* className="card tale-bg" */}
               <div>
                 <div className="card-people mt-auto">
                   <img src={imgDasboard} alt="people"/>
                   <div className="weather-info">
                     <div className="d-flex">
                      {/*  <div className="ml-2">
                         <h4 className="mb-0 font-weight-normal"><strong><EventNoteIcon/>{fechaActual}</strong></h4>
                       </div> */}
                       <div className="ml-2">
                         <h4 className="location font-weight-normal"><EventNoteIcon/> {fechaActual}</h4>
                         <h6 className="font-weight-normal"><LocationOnIcon/> Formosa</h6>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div className="col-md-6 grid-margin transparent">
               <div className="row">
                 {
                  productos?.length > 0 && productos?.map((item)=>{
                    return(
                      <div className="col-md-6 mb-4 stretch-card transparent">
                        <div className="card card-tale">
                          <div className="card-body">
                            <p className="mb-4">📗 Ultimo Producto Registrado</p>
                            <p style={{fontSize:"20px"}}><strong>{item?.nombre}</strong></p>
                            <p>Precio: <strong>$ {item?.precio}</strong></p>
                            <p>Distribuidor: <strong>{item?.distribuidor?.nombre}</strong></p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                 }

                 <div className="col-md-6 mb-4 stretch-card transparent">
                   <div className="card card-dark-blue">
                     <div className="card-body">
                       <p className="mb-4">Total</p>
                       <p className="fs-30 mb-2">61344</p>
                       <p>22.00% (30 dias)</p>
                     </div>
                   </div>
                 </div>
               </div>

               <div className="row">
                 <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                   <div className="card card-light-blue">
                     <div className="card-body">
                       <p className="mb-4">Medidas</p>
                       <p className="fs-30 mb-2">34040</p>
                       <p>2.00% (30 dias)</p>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-6 stretch-card transparent">
                   <div className="card card-light-danger">
                     <div className="card-body">
                       <p className="mb-4">Numero De Clientes</p>
                       <p className="fs-30 mb-2">47033</p>
                       <p>0.22% (30 dias)</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           
           <div className="row">
           {
              noticias?.primeraNoticia ?
               /*  console.log(item) */
                
              <div className="col-md-6 grid-margin stretch-card">
                <a href="http://soberaniaalimentariafsa.com/informativo" style={{textDecoration:"none"}} target="_blank">
                <div className="card">
                 <div className="card-body">
                   <p className="card-title">{noticias?.primeraNoticia?.titulo}</p>
                   <p className="font-weight-500">{parse(noticias?.primeraNoticia?.descripcion.substring(0,700 )) }</p>
                   <div  >
                     <div align="center" >
                      <img src={noticias?.primeraNoticia?.img} width="100%" height="90%" style={{borderRadius:"30px"}}/>
                     </div>
                    
                   </div>
                   
                 </div>
               </div>
                </a>
               
              </div>
                :
                null
              
              }
            
            {
              noticias?.otrasNoticias?.length > 0 && noticias?.otrasNoticias.map((item)=>{
               /*  console.log(item) */
                return(
              <div className="col-md-6 grid-margin stretch-card">
                <a href="http://soberaniaalimentariafsa.com/informativo" style={{textDecoration:"none"}} target="_blank">
                <div className="card">
                 <div className="card-body">
                   <p className="card-title">{item?.titulo}</p>
                   <p className="font-weight-500">{parse(item?.descripcion.substring(0,700 )) }</p>
                   <div  >
                     <div align="center" >
                      <img src={item?.img} width="100%" height="90%" style={{borderRadius:"30px"}}/>
                     </div>
                    
                   </div>
                   
                 </div>
               </div>
                </a>
               
              </div>
                )
              })
            }
           </div>
           
           <div className="row">
             <div className="col-md-12 grid-margin stretch-card">
               <div className="card position-relative">
                 <div className="card-body">
                   <div id="detailedReports" className="carousel slide detailed-report-carousel position-static pt-2" data-ride="carousel">
                     <div className="">
                       <div className="">
                         <div className="row">
                          {
                            programasNF?.length > 0 && programasNF?.map((item)=>{
                              const fecha = new Date(item?.fecha);
                              const fechaConvertida = fecha.toLocaleDateString();

                              return(
                                <div className="col-md-12 col-xl-3 d-flex flex-column" align="center">
                                <a href={item?.videoLink} target="_blank">
                                <div className="ml-xl-4 mt-3">
                                <p className="card-title">{item?.titulo}</p>
                                <img src={item?.miniaturaLink} width="80%" style={{borderRadius:"20px"}}/>
                                  <div>
                                  <p><strong>{fechaConvertida}</strong></p>
                                  </div>
                                </div>  
                                </a>
                                </div>
                              )
                            }) 
                          }
                          
                          {/* <div className="col-md-12 col-xl-9">
                             <div className="row">
                               <div className="col-md-6 border-right">
                                 <div className="table-responsive mb-3 mb-md-0 mt-3">
                                   <table className="table table-borderless report-table">
                                     <tr>
                                       <td className="text-muted">Illinois</td>
                                       <td className="w-100 px-0">
                                         <div className="progress progress-md mx-4">
                                           <div className="progress-bar bg-primary" role="progressbar" style={{width: "70%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                         </div>
                                       </td>
                                       <td><h5 className="font-weight-bold mb-0">713</h5></td>
                                     </tr>
                                     <tr>
                                       <td className="text-muted">Washington</td>
                                       <td className="w-100 px-0">
                                         <div className="progress progress-md mx-4">
                                           <div className="progress-bar bg-warning" role="progressbar" style={{width: "30%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                         </div>
                                       </td>
                                       <td><h5 className="font-weight-bold mb-0">583</h5></td>
                                     </tr>
                                     <tr>
                                       <td className="text-muted">Mississippi</td>
                                       <td className="w-100 px-0">
                                         <div className="progress progress-md mx-4">
                                           <div className="progress-bar bg-danger" role="progressbar" style={{width: "95%"}} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                         </div>
                                       </td>
                                       <td><h5 className="font-weight-bold mb-0">924</h5></td>
                                     </tr>
                                     <tr>
                                       <td className="text-muted">California</td>
                                       <td className="w-100 px-0">
                                         <div className="progress progress-md mx-4">
                                           <div className="progress-bar bg-info" role="progressbar" style={{width: "60%"}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                         </div>
                                       </td>
                                       <td><h5 className="font-weight-bold mb-0">664</h5></td>
                                     </tr>
                                     <tr>
                                       <td className="text-muted">Maryland</td>
                                       <td className="w-100 px-0">
                                         <div className="progress progress-md mx-4">
                                           <div className="progress-bar bg-primary" role="progressbar" style={{width: "40%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                         </div>
                                       </td>
                                       <td><h5 className="font-weight-bold mb-0">560</h5></td>
                                     </tr>
                                     <tr>
                                       <td className="text-muted">Alaska</td>
                                       <td className="w-100 px-0">
                                         <div className="progress progress-md mx-4">
                                           <div className="progress-bar bg-danger" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                         </div>
                                       </td>
                                       <td><h5 className="font-weight-bold mb-0">793</h5></td>
                                     </tr>
                                   </table>
                                 </div>
                               </div>
                               <div className="col-md-6 mt-3">
                                 <canvas id="north-america-chart"></canvas>
                                 <div id="north-america-legend"></div>
                               </div>
                             </div>
                           </div>  */}
                         </div>
                       </div>
                       
                     </div>
                     
                   </div>
                 </div>
               </div>
             </div>
           </div>

           
           
         
         </div>
        
         <Footer/>
       
       </div>
     
    </Container>
  )
}

Panel.propTypes = {
  mostrarNoticias: PropTypes.func.isRequired,
  noticias: PropTypes.object.isRequired,

  mostrarProductos: PropTypes.func.isRequired,
  productos: PropTypes.object.isRequired,

  mostrarProgramasNF: PropTypes.func.isRequired,
  programasNF: PropTypes.object.isRequired,

  mostrarNotificaciones : PropTypes.func.isRequired,
  notificaciones: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  noticia: state.noticiaReducer,
  producto: state.productosReducer,
  programas: state.programaVivoReducer,
  notificacion: state.notificacionesReducer
});

export default connect(mapStateToProps, { mostrarNoticias,mostrarNotificaciones, mostrarProductos, mostrarProgramasNF })(
  Panel
);
