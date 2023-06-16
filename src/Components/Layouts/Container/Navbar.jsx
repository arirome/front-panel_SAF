import React, { useEffect, useState } from "react";
import imgLogoSVG from '../../Assets/images/logo.png'
import imgLogoMiniSVG from '../../Assets/images/logo-mini.png'
import imgFace28 from '../../Assets/images/faces/face28.jpg'
import imgFace6 from '../../Assets/images/faces/face6.jpg'
import imgFace1 from '../../Assets/images/faces/face1.jpg'
import imgFace2 from '../../Assets/images/faces/face2.jpg'
import imgFace3 from '../../Assets/images/faces/face3.jpg'
import imgFace4 from '../../Assets/images/faces/face4.jpg'
import imgFace5 from '../../Assets/images/faces/face5.jpg'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../../Redux/Actions/login.action'
import { Link } from 'react-router-dom'
import { mostrarNotificaciones, leerNotificiacion } from "../../../Redux/Actions/notificaciones.action";
import './StyleContainers/Navbar.css'
import 'animate.css';
import { addActiveClass } from "../Anims/OcultarMenuLateral";
const date = new Date();
const Navbar = ({ auth: {user}, logout, mostrarNotificaciones,leerNotificiacion, notificacion:{notificaciones} }) => {

  useEffect(()=>{
    mostrarNotificaciones()
  },[])

  const [arrayNotificaciones, setArrayNotificaciones] = useState([])
  const [countArray, setCountArray] = useState(0)

  const [appAnim, setAppAnim] = useState("") //animate__animated animate__bounceOutRight
  const [nroAnim, setNroAnim] = useState(-1)

  useEffect(()=>{
    setArrayNotificaciones(notificaciones)
    setCountArray(notificaciones.length)
  },[notificaciones])
  

  const [dateTime, setDateTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setDateTime({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const eliminarNotificacion = async (e,id, i)=>{
    e.stopPropagation()
    /* setNroAnim(i) */
    //console.log(`${e.target.textContent} clicado!`);
    
    arrayNotificaciones.splice(i,1)
    await leerNotificiacion(id)
    setCountArray(notificaciones.length)
    //mostrarNotificaciones()
    
    /* setNroAnim(-1) */
  }

  return (
    <>
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo mr-5 " ><img src={imgLogoSVG} className="mr-2 " alt="logo"/></a>
        <a className="navbar-brand brand-logo-mini" ><img src={imgLogoMiniSVG} alt="logo"/></a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize" onClick={()=>{addActiveClass()}}>
          <span className="icon-menu"></span>
        </button>
        <ul className="navbar-nav mr-lg-2">
          <li className="nav-item nav-search d-none d-lg-block">
            <div className="input-group">
              <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                <span className="input-group-text" id="search">
                  <i className="icon-search"></i>
                </span>
              </div>
              <input type="text" className="form-control" id="navbar-search-input" placeholder="Buscar..." aria-label="search" aria-describedby="search"/>
            </div>
          </li>
        </ul>
        <ul className="navbar-nav navbar-nav-right ">
          <li className="nav-item dropdown">
          {
            dateTime.minutes < 10 ?
            <p className="nav-link " style={{position:"relative", top:"8px"}}>{dateTime.hours < 10 ? <>0{dateTime.hours}</>:<>{dateTime.hours}</>}:0{dateTime.minutes}:{dateTime.seconds < 10 ? <>0{dateTime.seconds}</>: <>{dateTime.seconds}</>}</p>
            :
            <p className="nav-link" style={{position:"relative", top:"8px"}}>{dateTime.hours < 10 ? <>0{dateTime.hours}</>:<>{dateTime.hours}</>}:{dateTime.minutes}:{dateTime.seconds < 10 ? <>0{dateTime.seconds}</>: <>{dateTime.seconds}</>}</p>
          }
          </li>
          
          <li className="nav-item dropdown">
            <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
              <i className="icon-bell mx-0"></i>
              {
                arrayNotificaciones?.length > 0 ? <span className="count "></span> : null
              }
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
              <p className="mb-0 font-weight-normal float-left dropdown-header">Notificaciones Nuevas ({countArray})</p>
                {
                  arrayNotificaciones?.length > 0 ? 
                  <>
                    {
                      arrayNotificaciones?.map((item, i)=>{
                        /* console.log("I: " + i)
                        console.log("nroAnim: " + nroAnim) */
                        return(
                          <React.Fragment key={item?.uid}>
                            <button type="button" className="dropdown-item preview-item" 
                            onClick={(e)=>{eliminarNotificacion(e,item?.uid, i)}}>
                              <div className="preview-thumbnail">
                              <div className={"preview-icon " + item?.color}>
                                    <i className={item?.img + " mx-0"}></i>
                                  </div>
                              </div>
                              <div className="preview-item-content">
                                <h6 className="preview-subject font-weight-normal">{item?.descripcion.substring(0,22)}</h6> {/* .substring(0,35) */}
                                <p className="textoBorrar font-weight-light small-text mb-0" style={{color:"red"}}>
                                  Eliminar
                                </p>
                              </div>
                            </button>
                      
                          </React.Fragment>
                        )
                      })
                    }
                  </>
                  :
                  <div className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-warning">
                    <i className="ti-email mx-0"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal">Sin Notificaciones</h6>
                  {/* <p className="font-weight-light small-text mb-0 text-muted">
                    Private message
                  </p> */}
                </div>
              </div>
                }
            </div>
          </li>
          <li className="nav-item nav-profile dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
              {
                user?.img ?
                <img src={user?.img} alt="profile"/>
                :
                <img src={imgFace28} alt="profile"/>
              }
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
            <p className="dropdown-item">
                <i className="ti-user text-primary"></i>
                {user?.nombre} {user?.apellido}
              </p>
              <a className="dropdown-item">
                <i className="ti-settings text-primary"></i>
                Ajustes
              </a>
              <Link className="dropdown-item" to="/login" onClick={logout}>
                <i className="ti-power-off text-primary"></i>
                Cerrar Sesion
              </Link>
            </div>
          </li>
          <li className="nav-item nav-settings d-none d-lg-flex">
            <a className="nav-link" href="#">
              <i className="ti-calendar"></i> {/* icon-ellipsis */}
            </a>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span className="icon-menu"></span>
        </button>
      </div>
    </nav>
     <div id="right-sidebar" className="settings-panel">
     <i className="settings-close ti-close"></i>
     <ul className="nav nav-tabs border-top" id="setting-panel" role="tablist">
       <li className="nav-item">
         <a className="nav-link active" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">TO DO LIST</a>
       </li>
       <li className="nav-item">
         <a className="nav-link" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">CHATS</a>
       </li>
     </ul>
     <div className="tab-content" id="setting-content">
       <div className="tab-pane fade show active scroll-wrapper" id="todo-section" role="tabpanel" aria-labelledby="todo-section">
         <div className="add-items d-flex px-3 mb-0">
           <form className="form w-100">
             <div className="form-group d-flex">
               <input type="text" className="form-control todo-list-input" placeholder="Add To-do"/>
               <button type="submit" className="add btn btn-primary todo-list-add-btn" id="add-task">Add</button>
             </div>
           </form>
         </div>
         <div className="list-wrapper px-3">
           <ul className="d-flex flex-column-reverse todo-list">
             <li>
               <div className="form-check">
                 <label className="form-check-label">
                   <input className="checkbox" type="checkbox"/>
                   Team review meeting at 3.00 PM
                 </label>
               </div>
               <i className="remove ti-close"></i>
             </li>
             <li>
               <div className="form-check">
                 <label className="form-check-label">
                   <input className="checkbox" type="checkbox"/>
                   Prepare for presentation
                 </label>
               </div>
               <i className="remove ti-close"></i>
             </li>
             <li>
               <div className="form-check">
                 <label className="form-check-label">
                   <input className="checkbox" type="checkbox"/>
                   Resolve all the low priority tickets due today
                 </label>
               </div>
               <i className="remove ti-close"></i>
             </li>
             <li className="completed">
               <div className="form-check">
                 <label className="form-check-label">
                   <input className="checkbox" type="checkbox" defaultChecked/>
                   Schedule meeting for next week
                 </label>
               </div>
               <i className="remove ti-close"></i>
             </li>
             <li className="completed">
               <div className="form-check">
                 <label className="form-check-label">
                   <input className="checkbox" type="checkbox" defaultChecked/>
                   Project review
                 </label>
               </div>
               <i className="remove ti-close"></i>
             </li>
           </ul>
         </div>
         <h4 className="px-3 text-muted mt-5 font-weight-light mb-0">Events</h4>
         <div className="events pt-4 px-3">
           <div className="wrapper d-flex mb-2">
             <i className="ti-control-record text-primary mr-2"></i>
             <span>Feb 11 2018</span>
           </div>
           <p className="mb-0 font-weight-thin text-gray">Creating component page build a js</p>
           <p className="text-gray mb-0">The total number of sessions</p>
         </div>
         <div className="events pt-4 px-3">
           <div className="wrapper d-flex mb-2">
             <i className="ti-control-record text-primary mr-2"></i>
             <span>Feb 7 2018</span>
           </div>
           <p className="mb-0 font-weight-thin text-gray">Meeting with Alisa</p>
           <p className="text-gray mb-0 ">Call Sarah Graves</p>
         </div>
       </div>
  
       <div className="tab-pane fade" id="chats-section" role="tabpanel" aria-labelledby="chats-section">
         <div className="d-flex align-items-center justify-content-between border-bottom">
           <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">Friends</p>
           <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">See All</small>
         </div>
         <ul className="chat-list">
           <li className="list active">
             <div className="profile"><img src={imgFace1} alt="image"/><span className="online"></span></div>
             <div className="info">
               <p>Thomas Douglas</p>
               <p>Available</p>
             </div>
             <small className="text-muted my-auto">19 min</small>
           </li>
           <li className="list">
             <div className="profile"><img src={imgFace2} alt="image"/><span className="offline"></span></div>
             <div className="info">
               <div className="wrapper d-flex">
                 <p>Catherine</p>
               </div>
               <p>Away</p>
             </div>
             <div className="badge badge-success badge-pill my-auto mx-2">4</div>
             <small className="text-muted my-auto">23 min</small>
           </li>
           <li className="list">
             <div className="profile"><img src={imgFace3} alt="image"/><span className="online"></span></div>
             <div className="info">
               <p>Daniel Russell</p>
               <p>Available</p>
             </div>
             <small className="text-muted my-auto">14 min</small>
           </li>
           <li className="list">
             <div className="profile"><img src={imgFace4} alt="image"/><span className="offline"></span></div>
             <div className="info">
               <p>James Richardson</p>
               <p>Away</p>
             </div>
             <small className="text-muted my-auto">2 min</small>
           </li>
           <li className="list">
             <div className="profile"><img src={imgFace5} alt="image"/><span className="online"></span></div>
             <div className="info">
               <p>Madeline Kennedy</p>
               <p>Available</p>
             </div>
             <small className="text-muted my-auto">5 min</small>
           </li>
           <li className="list">
             <div className="profile"><img src={imgFace6} alt="image"/><span className="online"></span></div>
             <div className="info">
               <p>Sarah Graves</p>
               <p>Available</p>
             </div>
             <small className="text-muted my-auto">47 min</small>
           </li>
         </ul>
       </div>
     
     </div>
   </div>
    </>
  )
}

Navbar.propTypes = {
    logout : PropTypes.func.isRequired,
    mostrarNotificaciones : PropTypes.func.isRequired,
    leerNotificiacion : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    notificaciones: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = state => ({
    auth: state.auth,
    notificacion: state.notificacionesReducer
  })
  
export default connect(mapStateToProps ,{logout, mostrarNotificaciones, leerNotificiacion})(Navbar)
