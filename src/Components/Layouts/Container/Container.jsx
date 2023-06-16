import React from 'react'


import Navbar from './Navbar'
import SiderBar from './SiderBar'
import { 
  cerrarMenu, 
  colorDanger, 
  colorDark, 
  colorDefault, 
  colorInfo, 
  colorPrimary, 
  colorSuccess, 
  colorWarning, 
  seleccionarTemaClaroSB, 
  seleccionarTemaCustomSB, 
  seleccionarTemaOscuroSB, 
  verMenu } from './Themes/SeleccionarTema'

const Container = ({ children }) => {



  return (
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper">
    <Navbar/>
     {/* <div className="theme-setting-wrapper">
         <div id="settings-trigger" style={{cursor:'pointer'}} onClick={()=>{verMenu()}}><i className="ti-settings" ></i></div>
         <div id="theme-settings" className="settings-panel" >
           <i className="settings-close ti-close" onClick={()=>{cerrarMenu()}} ></i>
           <p className="settings-heading">Menu Lateral</p>
           <div className="sidebar-bg-options selected" id="sidebar-light-theme" onClick={()=>{seleccionarTemaClaroSB()}} style={{cursor:'pointer'}}><div className="img-ss rounded-circle bg-light border mr-3"></div>Modo Claro</div>
           <div className="sidebar-bg-options" id="sidebar-dark-theme" onClick={()=>{seleccionarTemaOscuroSB()}} style={{cursor:'pointer'}}><div className="img-ss rounded-circle bg-dark border mr-3"></div>Modo Oscuro</div>
           <div className="sidebar-bg-options" id="sidebar-custom-theme" onClick={()=>{seleccionarTemaCustomSB()}} style={{cursor:'pointer'}}><div className="img-ss rounded-circle bg-primary border mr-3"></div>Modo Ariela</div>
           <p className="settings-heading mt-2">Menu Horizontal</p>
           <div className="color-tiles mx-0 px-4">
             <div className="tiles primary" id='colorPrimary' onClick={()=>{colorPrimary()}}></div>
             <div className="tiles success" id='colorSuccess' onClick={()=>{colorSuccess()}}></div>
             <div className="tiles warning" id='colorWarning' onClick={()=>{colorWarning()}}></div>
             <div className="tiles danger" id='colorDanger' onClick={()=>{colorDanger()}}></div>
             <div className="tiles info" id='colorInfo' onClick={()=>{colorInfo()}}></div>
             <div className="tiles dark" id='colorDark'onClick={()=>{colorDark()}}></div>
             <div className="tiles default" id='colorDefault' onClick={()=>{colorDefault()}}></div>
           </div>
         </div>
       </div>  */}
    <SiderBar/>
       
    {children}
    </div>
    </div>
  )
}

export default Container