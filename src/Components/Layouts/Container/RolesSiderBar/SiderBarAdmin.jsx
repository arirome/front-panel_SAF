import React from 'react'
import { Link } from 'react-router-dom'
const SiderBarAdmin = () => {
  return (
    <ul className="nav">
           <li className="nav-item">
             <Link className="nav-link" to="/panel">
               <i className="icon-grid menu-icon"></i>
               <span className="menu-title">Panel</span>
             </Link>
           </li>

           <li className="nav-item">
             <Link to="/asistencias" className="nav-link" >
               <i className="ti-layout-list-thumb-alt menu-icon"></i>
               <span className="menu-title">Asistencias</span>
             </Link>
           </li>

           <li className="nav-item">
             <Link to="/convocados" className="nav-link" >
               <i className="icon-head menu-icon"></i>
               <span className="menu-title">Convocados</span>
             </Link>
           </li>

           <li className="nav-item">
             <Link to="/usuarios" className="nav-link" >
               <i className="icon-head menu-icon"></i>
               <span className="menu-title">Usuarios</span>
             </Link>
           </li>
           
           <li className="nav-item">
             <Link to="/Puntos" className="nav-link" >
               <i className="ti-pin2 menu-icon"></i>
               <span className="menu-title">Puntos</span>
             </Link>
           </li>

           <li className="nav-item">
             <Link to="/productos" className="nav-link" >
               <i className="ti-package menu-icon"></i>
               <span className="menu-title">Productos</span>
             </Link>
           </li>

           <li className="nav-item">
             <Link className="nav-link" to="/inventario">
               <i className="icon-layout menu-icon"></i>
               <span className="menu-title">Inventario</span>
             </Link>
           </li>

           <li className="nav-item">
             <Link to="/parte-del-dia" className="nav-link" >
               <i className="icon-paper menu-icon"></i>
               <span className="menu-title">Parte del dia</span>
             </Link>
           </li>

           <li className="nav-item">
             <hr/>
           </li>

           <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
              <i class="icon-grid-2 menu-icon"></i>
              <span class="menu-title">Publicaciones</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="tables">
              <ul class="nav flex-column sub-menu">
                <Link to="/noticias">
                <li class="nav-item"> <a class="nav-link" >Noticias</a></li>
                </Link>
              </ul>
              <ul class="nav flex-column sub-menu">
                <Link to="/nutriNoticias">
                <li class="nav-item"> <a class="nav-link" >Nutri-Noticias</a></li>
                </Link>
              </ul>
              <ul class="nav flex-column sub-menu">
                <Link to="/programas">
                <li class="nav-item"> <a class="nav-link" >Programas</a></li>
                </Link>
              </ul>
              <ul class="nav flex-column sub-menu">
                <Link to="/cronograma">
                <li class="nav-item"> <a class="nav-link" >Cronogramas</a></li>
                </Link>
              </ul>
              
            </div>
          </li>

           <li className="nav-item">
             <Link to="/" className="nav-link" >
               <i className="ti-archive menu-icon"></i>
               <span className="menu-title">Archivados</span>
             </Link>
           </li>

           {/* <li className="nav-item">
             <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
               <i className="icon-layout menu-icon"></i>
               <span className="menu-title">UI Elements</span>
               <i className="menu-arrow"></i>
             </a>
             <div className="collapse" id="ui-basic">
               <ul className="nav flex-column sub-menu">
                 <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                 <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
                 <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
               </ul>
             </div>
           </li>
           <li className="nav-item">
             <a className="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
               <i className="icon-columns menu-icon"></i>
               <span className="menu-title">Form elements</span>
               <i className="menu-arrow"></i>
             </a>
             <div className="collapse" id="form-elements">
               <ul className="nav flex-column sub-menu">
                 <li className="nav-item"><a className="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a></li>
               </ul>
             </div>
           </li>
           <li className="nav-item">
             <a className="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
               <i className="icon-bar-graph menu-icon"></i>
               <span className="menu-title">Charts</span>
               <i className="menu-arrow"></i>
             </a>
             <div className="collapse" id="charts">
               <ul className="nav flex-column sub-menu">
                 <li className="nav-item"> <a className="nav-link" href="pages/charts/chartjs.html">ChartJs</a></li>
               </ul>
             </div>
           </li>
           <li className="nav-item">
             <a className="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
               <i className="icon-grid-2 menu-icon"></i>
               <span className="menu-title">Tables</span>
               <i className="menu-arrow"></i>
             </a>
             <div className="collapse" id="tables">
               <ul className="nav flex-column sub-menu">
                 <li className="nav-item"> <a className="nav-link" href="pages/tables/basic-table.html">Basic table</a></li>
               </ul>
             </div>
           </li>
           <li className="nav-item">
             <a className="nav-link" data-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
               <i className="icon-contract menu-icon"></i>
               <span className="menu-title">Icons</span>
               <i className="menu-arrow"></i>
             </a>
             <div className="collapse" id="icons">
               <ul className="nav flex-column sub-menu">
                 <li className="nav-item"> <a className="nav-link" href="pages/icons/mdi.html">Mdi icons</a></li>
               </ul>
             </div>
           </li>
           <li className="nav-item">
             <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
               <i className="icon-head menu-icon"></i>
               <span className="menu-title">User Pages</span>
               <i className="menu-arrow"></i>
             </a>
             <div className="collapse" id="auth">
               <ul className="nav flex-column sub-menu">
                 <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                 <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
               </ul>
             </div>
           </li>
           <li className="nav-item">
             <a className="nav-link" data-toggle="collapse" href="#error" aria-expanded="false" aria-controls="error">
               <i className="icon-ban menu-icon"></i>
               <span className="menu-title">Error pages</span>
               <i className="menu-arrow"></i>
             </a>
             <div className="collapse" id="error">
               <ul className="nav flex-column sub-menu">
                 <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                 <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
               </ul>
             </div>
           </li> */}
         </ul>
  )
}

export default SiderBarAdmin